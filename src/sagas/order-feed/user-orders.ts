import { SagaIterator, Task } from 'redux-saga';
import { take, fork, cancel, race } from 'redux-saga/effects';
import { ActionType } from '@/services/user-orders/actions';
import {
	setConnectionStatus,
	connectionError,
	updateData,
} from '@/services/user-orders/user-orders-slice';
import { listenForSocketMessages } from '../saga';
import { WS_URL_USER } from '@/utils/api/endpoints';

export function* userOrdersConnect(): SagaIterator {
	let socketTask: Task | null = null;

	while (true) {
		yield take(ActionType.CONNECT);

		if (socketTask) {
			yield cancel(socketTask);
		}

		socketTask = yield fork(() =>
			listenForSocketMessages(WS_URL_USER, {
				setConnectionStatus,
				connectionError,
				updateData,
			})
		);

		const result = yield race({
			disconnect: take(ActionType.DISCONNECT),
			reconnect: take(ActionType.CONNECT),
		});

		if (socketTask) {
			yield cancel(socketTask);
			socketTask = null;
		}

		if (result.reconnect) {
			continue;
		}
	}
}
