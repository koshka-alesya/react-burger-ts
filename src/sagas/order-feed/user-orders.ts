import { SagaIterator, Task } from 'redux-saga';
import { take, fork, cancel } from 'redux-saga/effects';
import { ActionType } from '@/services/user-orders/actions';
import {
	setConnectionStatus,
	connectionError,
	updateData,
} from '@/services/user-orders/user-orders-slice';
import { listenForSocketMessages } from '../saga';
import { WS_URL_USER } from '@/utils/api/endpoints';

export function* userOrdersConnect(): SagaIterator {
	while (true) {
		yield take(ActionType.CONNECT);
		const socketTask: Task = yield fork(() =>
			listenForSocketMessages(
				WS_URL_USER,
				{
					setConnectionStatus,
					connectionError,
					updateData,
				},
				true
			)
		);
		yield take(ActionType.DISCONNECT);
		yield cancel(socketTask);
	}
}
