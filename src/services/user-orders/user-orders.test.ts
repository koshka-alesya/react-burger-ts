import { ConnectionStatus, TOrdersResponse, TOrdersStore } from '@/utils/types';
import {
	userOrdersSlice,
	connectionError,
	setConnectionStatus,
	updateData,
} from './user-orders-slice';

const reducer = userOrdersSlice.reducer;

const initialState: TOrdersStore = {
	status: ConnectionStatus.OFFLINE,
	connectionError: '',
	orders: [],
	total: 0,
	totalToday: 0,
};

const ordersResponse: TOrdersResponse = {
	success: true,
	orders: [
		{
			_id: '68b32b90673086001ba857d3',
			ingredients: [
				'643d69a5c3f7b9001cfa093d',
				'643d69a5c3f7b9001cfa093e',
				'643d69a5c3f7b9001cfa093d',
			],
			status: 'done',
			name: 'Флюоресцентный люминесцентный бургер',
			createdAt: '2025-08-30T16:49:20.885Z',
			updatedAt: '2025-08-30T16:49:21.932Z',
			number: '87497',
		},
	],
	total: 87122,
	totalToday: 41,
};

describe('userOrdersSlice reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, { type: '' })).toEqual(initialState);
	});

	it('should handle setConnectionStatus', () => {
		expect(
			reducer(initialState, setConnectionStatus(ConnectionStatus.CONNECTING))
		).toEqual({
			...initialState,
			status: ConnectionStatus.CONNECTING,
		});
	});

	it('should handle connectionError', () => {
		const errorMessage = 'Connection failed';
		expect(reducer(initialState, connectionError(errorMessage))).toEqual({
			...initialState,
			connectionError: errorMessage,
		});
	});

	it('should handle updateData', () => {
		expect(reducer(initialState, updateData(ordersResponse))).toEqual({
			...initialState,
			orders: ordersResponse.orders,
			total: ordersResponse.total,
			totalToday: ordersResponse.totalToday,
		});
	});
});
