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

export const initialState: TOrdersStore = {
	status: ConnectionStatus.OFFLINE,
	connectionError: '',
	orders: [],
	total: 0,
	totalToday: 0,
};

export const userOrdersSlice = createSlice({
	name: 'user_orders',
	initialState,
	selectors: {
		getUserOrders: (state) => state.orders,
		getUserOrdersState: (state) => state,
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
	userOrdersSlice.actions;
export const { getUserOrders, getConnectionStatus, getUserOrdersState } =
	userOrdersSlice.selectors;

export const getUserProcessedOrders = createSelector(
	[getUserOrders, getIngredients],
	(orders: TOrder[], ingredients: TIngredient[]): TOrderProcessed[] =>
		processOrders(orders, ingredients)
);
