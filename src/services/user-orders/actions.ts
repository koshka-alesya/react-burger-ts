import { ConnectionStatus, TOrdersResponse } from '@/utils/types';

enum ActionType {
	CONNECT = 'USER_ORDERS_CONNECT',
	DISCONNECT = 'USER_ORDERS_DISCONNECT',
	SET_SERVER_STATUS = 'USERL_ORDERS_SET_SERVER_STATUS',
	CONNECTION_ERROR = 'USER_ORDERS_CONNECTION_ERROR',
	UPDATE_DATA = 'USER_ORDERS_UPDATE_DATA',
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
