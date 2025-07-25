import { createAsyncThunk } from '@reduxjs/toolkit';
import { addOrder } from '../../utils/order-api';
import { TIngredient } from '@/utils/types';
import { RootState } from '../store';

export type TCreateOrderResponse = {
	name: string;
	order: {
		number: number;
	};
	success: boolean;
};

export const createOrder = createAsyncThunk<
	TCreateOrderResponse,
	void,
	{ state: RootState }
>('order/createOrder', async (_, { getState, rejectWithValue }) => {
	const state = getState();
	const bun = state.burgerСonstructor.bun;
	const ingredients = state.burgerСonstructor.ingredients;

	if (!bun) return rejectWithValue('Булка не выбрана');

	const ingredientIds = [
		bun._id,
		...ingredients.map((item: TIngredient) => item._id),
		bun._id,
	];

	try {
		return await addOrder(ingredientIds);
	} catch (err) {
		const message =
			err instanceof Error ? err.message : 'Ошибка создания заказа';
		return rejectWithValue(message);
	}
});
