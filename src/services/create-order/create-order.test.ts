import { TCreateOrderResponse, createOrder } from './actions';
import {
	clearOrder,
	createOrderSlice,
	initialState,
} from './create-order-slice';

const reducer = createOrderSlice.reducer;

const order: TCreateOrderResponse = {
	name: 'test',
	order: {
		number: 1,
	},
	success: true,
};

describe('createOrderSlice reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, { type: '' })).toEqual(initialState);
	});

	it('should handle clearOrder', () => {
		expect(reducer(initialState, clearOrder())).toEqual({
			...initialState,
			order: null,
			loading: false,
			error: null,
		});
	});

	// CREATE ORDER
	it('should handle createOrder.pending', () => {
		const action = { type: createOrder.pending.type };
		const nextState = reducer(initialState, action);

		expect(nextState).toEqual({
			...initialState,
			loading: true,
			error: null,
		});
	});

	it('should handle createOrder.rejected', () => {
		const errorMessage = 'Create order failed';
		const action = {
			type: createOrder.rejected.type,
			error: { message: errorMessage },
		};
		const nextState = reducer(initialState, action);

		expect(nextState).toEqual({
			...initialState,
			loading: false,
			error: errorMessage,
		});
	});

	it('should handle createOrder.fulfilled', () => {
		const action = { type: createOrder.fulfilled.type, payload: order };

		expect(reducer(initialState, action)).toEqual({
			...initialState,
			loading: false,
			order,
		});
	});
});
