import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrder as getOrder } from '../../utils/api/order-api';
import { RootState } from '../store';
import { TOrder } from '@/utils/types';

export const fetchOrder = createAsyncThunk<
	TOrder,
	string,
	{ state: RootState }
>('order/fetchOrder', async (orderId, { getState, rejectWithValue }) => {
	const state = getState();

	const userOrder = state.user_orders.orders.find((o) => o.number == orderId);
	if (userOrder) return userOrder;

	const allOrder = state.all_orders.orders.find((o) => o.number == orderId);
	if (allOrder) return allOrder;

	try {
		const result = await getOrder(orderId);
		return (result.orders && result.orders.length && result.orders[0]) || null;
	} catch (err) {
		const message =
			err instanceof Error ? err.message : 'Ошибка получения заказа';
		return rejectWithValue(message);
	}
});
