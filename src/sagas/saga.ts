import { EventChannel, SagaIterator, eventChannel, END } from 'redux-saga';
import { call, put, take, cancelled, delay } from 'redux-saga/effects';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { ConnectionStatus } from '@/utils/types';
import { getAccessToken } from '@/utils/auth';

export type TSagaActions<T> = {
	setConnectionStatus: ActionCreatorWithPayload<ConnectionStatus>;
	connectionError: ActionCreatorWithPayload<string>;
	updateData: ActionCreatorWithPayload<T>;
};

const RECONNECT_TIME = 1000;

function createWebSocketConnection(wsUrl: string): Promise<WebSocket> {
	return new Promise((resolve, reject) => {
		const socket = new WebSocket(wsUrl);

		socket.onopen = () => resolve(socket);
		socket.onerror = (evt) => reject(evt);
		socket.onclose = () => {};
	});
}

function createSocketChannel(socket: WebSocket): EventChannel<string> {
	return eventChannel<string>((emit) => {
		socket.onmessage = (event) => {
			emit(String(event.data));
		};

		socket.onclose = () => {
			emit(END);
		};

		socket.onerror = () => {
			emit(END);
		};

		const unsubscribe = () => {
			socket.onmessage = null;
			socket.onclose = null;
			socket.onerror = null;
			socket.close();
		};

		return unsubscribe;
	});
}

export function* listenForSocketMessages<T>(
	wsUrl: string,
	actions: TSagaActions<T>,
	withToken: boolean = false
): SagaIterator {
	let socket: WebSocket | undefined;
	let socketChannel: EventChannel<string> | undefined;
	let isCancelled = false;

	try {
		while (!isCancelled) {
			try {
				yield put(actions.setConnectionStatus(ConnectionStatus.CONNECTING));

				const url = withToken ? `${wsUrl}?token=${getAccessToken()}` : wsUrl;
				socket = (yield call(createWebSocketConnection, url)) as WebSocket;
				socketChannel = (yield call(
					createSocketChannel,
					socket
				)) as EventChannel<string>;

				yield put(actions.setConnectionStatus(ConnectionStatus.ONLINE));

				while (true) {
					const payload: string | typeof END = yield take(socketChannel);
					if (payload === END) break;

					yield put(actions.updateData(JSON.parse(payload as string)));
				}
			} catch (error) {
				yield put(actions.connectionError(`WebSocket error: ${String(error)}`));
			} finally {
				if (socketChannel) socketChannel.close();
				if (socket) socket.close();

				if (yield cancelled()) {
					isCancelled = true;
					yield put(actions.setConnectionStatus(ConnectionStatus.OFFLINE));
				} else {
					yield delay(RECONNECT_TIME);
				}
			}
		}
	} finally {
		if (yield cancelled()) {
			if (socketChannel) socketChannel.close();
			if (socket) socket.close();
			yield put(actions.setConnectionStatus(ConnectionStatus.OFFLINE));
		}
	}
}
