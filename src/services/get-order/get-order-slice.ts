import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchOrder } from './actions';
import { TOrder, TOrderProcessed } from '@/utils/types';
import { processOrder } from '@/utils/orders';
import { getIngredients } from '../ingredients/ingredients-slice';

export type TOrderState = {
	order: TOrder | null;
	loading: boolean;
	error: string | null;
};

const initialState: TOrderState = {
	order: null,
	loading: false,
	error: null,
};

export const getOrderSlice = createSlice({
	name: 'get_order',
	initialState,
	reducers: {
		clearOrder(state) {
			state.order = null;
			state.loading = false;
			state.error = null;
		},
	},
	selectors: {
		getOrderState: (state) => state,
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchOrder.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchOrder.rejected, (state, action) => {
				state.loading = false;
				state.error =
					(action.payload as string) ??
					action.error?.message ??
					'Unknown error';
			})
			.addCase(fetchOrder.fulfilled, (state, action: PayloadAction<TOrder>) => {
				state.loading = false;
				state.order = action.payload;
			});
	},
});

export const { getOrderState } = getOrderSlice.selectors;
export const { clearOrder } = getOrderSlice.actions;

export const getOrder = createSelector(
	[getOrderState, getIngredients],
	(state, ingredients): TOrderProcessed | null => {
		if (state.order) {
			return processOrder(state.order, ingredients);
		}
		return null;
	}
);
