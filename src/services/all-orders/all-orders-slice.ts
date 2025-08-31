import {
	ConnectionStatus,
	TOrdersResponse,
	TIngredient,
	TOrder,
	TOrderProcessed,
	TOrdersStore,
} from '@/utils/types';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIngredients } from '../ingredients/ingredients-slice';
import { processOrders } from '@/utils/orders';

const initialState: TOrdersStore = {
	status: ConnectionStatus.OFFLINE,
	connectionError: '',
	orders: [],
	total: 0,
	totalToday: 0,
};

export const allOrdersSlice = createSlice({
	name: 'all_orders',
	initialState,
	selectors: {
		getAllOrders: (state) => state.orders,
		getAllOrdersState: (state) => state,
		getConnectionStatus: (state) => state.status,
	},
	reducers: {
		setConnectionStatus(state, action: PayloadAction<ConnectionStatus>) {
			state.status = action.payload;
		},
		connectionError(state, action: PayloadAction<string>) {
			state.connectionError = action.payload;
		},
		updateData(state, action: PayloadAction<TOrdersResponse>) {
			const data = action.payload;
			if (data && data.success) {
				state.orders = data.orders;
				state.total = data.total;
				state.totalToday = data.totalToday;
			}
		},
	},
});

export const { setConnectionStatus, connectionError, updateData } =
	allOrdersSlice.actions;
export const { getAllOrders, getConnectionStatus, getAllOrdersState } =
	allOrdersSlice.selectors;

export const getAllProcessedOrders = createSelector(
	[getAllOrders, getIngredients],
	(orders: TOrder[], ingredients: TIngredient[]): TOrderProcessed[] =>
		processOrders(orders, ingredients)
);

export const getDoneOrders = createSelector(
	[getAllOrders],
	(orders: TOrder[]): string[] =>
		orders
			.filter((order: TOrder) => order.status === 'done')
			.map((order: TOrder) => order.number)
);

export const getPendingOrders = createSelector(
	[getAllOrders],
	(orders: TOrder[]): string[] =>
		orders
			.filter((order: TOrder) => order.status === 'pending')
			.map((order: TOrder) => order.number)
);
