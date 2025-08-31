import { ConnectionStatus, TOrdersResponse } from '@/utils/types';

enum ActionType {
	CONNECT = 'ALL_ORDERS_CONNECT',
	DISCONNECT = 'ALL_ORDERS_DISCONNECT',
	SET_SERVER_STATUS = 'ALL_ORDERS_SET_SERVER_STATUS',
	CONNECTION_ERROR = 'ALL_ORDERS_CONNECTION_ERROR',
	UPDATE_DATA = 'ALL_ORDERS_UPDATE_DATA',
}

const ActionCreator = {
	connect: () => ({
		type: ActionType.CONNECT,
		payload: null,
	}),

	disconnect: () => ({
		type: ActionType.DISCONNECT,
		payload: null,
	}),

	connectionError: (error: string) => ({
		type: ActionType.CONNECTION_ERROR,
		payload: error,
	}),

	setConnectionStatus: (status: ConnectionStatus) => ({
		type: ActionType.SET_SERVER_STATUS,
		payload: status,
	}),

	updateData: (changes: TOrdersResponse) => ({
		type: ActionType.UPDATE_DATA,
		payload: changes,
	}),
};

export { ActionType, ActionCreator };
