import { SagaIterator, Task } from 'redux-saga';
import { take, fork, cancel, race } from 'redux-saga/effects';
import { ActionType } from '@/services/all-orders/actions';
import {
	setConnectionStatus,
	connectionError,
	updateData,
} from '@/services/all-orders/all-orders-slice';
import { listenForSocketMessages } from '../saga';
import { WS_URL_ALL } from '@/utils/api/endpoints';

export function* allOrdersConnect(): SagaIterator {
	let socketTask: Task | null = null;

	while (true) {
		yield take(ActionType.CONNECT);

		if (socketTask) {
			yield cancel(socketTask);
		}

		socketTask = yield fork(() =>
			listenForSocketMessages(WS_URL_ALL, {
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
