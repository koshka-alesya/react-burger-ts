import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createOrder, TCreateOrderResponse } from './actions';

export type TOrderState = {
	order: TCreateOrderResponse | null;
	loading: boolean;
	error: string | null;
};

const initialState: TOrderState = {
	order: null,
	loading: false,
	error: null,
};

export const createOrderSlice = createSlice({
	name: 'order',
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
			.addCase(createOrder.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createOrder.rejected, (state, action) => {
				state.loading = false;
				state.error =
					(action.payload as string) ??
					action.error?.message ??
					'Unknown error';
			})
			.addCase(
				createOrder.fulfilled,
				(state, action: PayloadAction<TCreateOrderResponse>) => {
					state.loading = false;
					state.order = action.payload;
				}
			);
	},
});

export const { getOrderState } = createOrderSlice.selectors;
export const { clearOrder } = createOrderSlice.actions;
