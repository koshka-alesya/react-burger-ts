import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createOrder, TCreateOrderResponse } from './actions';

interface OrderState {
	order: TCreateOrderResponse | null;
	loading: boolean;
	error: string | null;
}

const initialState: OrderState = {
	order: null,
	loading: false,
	error: null,
};

export const orderSlice = createSlice({
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

export const { getOrderState } = orderSlice.selectors;
export const { clearOrder } = orderSlice.actions;
