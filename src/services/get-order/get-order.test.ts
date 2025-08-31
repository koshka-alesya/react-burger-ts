import { TOrder } from '@/utils/types';
import { fetchOrder } from './actions';
import { TOrderState, clearOrder, getOrderSlice } from './get-order-slice';

const reducer = getOrderSlice.reducer;

const initialState: TOrderState = {
	order: null,
	loading: false,
	error: null,
};

const order: TOrder = {
	_id: '1',
	number: '1',
	status: 'created',
	createdAt: '01.01.2025',
	updatedAt: '01.01.2025',
	ingredients: ['1'],
	name: 'test',
};

describe('getOrderSlice reducer', () => {
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

	// FETCH ORDER
	it('should handle fetchOrder.pending', () => {
		const action = { type: fetchOrder.pending.type };
		const nextState = reducer(initialState, action);

		expect(nextState).toEqual({
			...initialState,
			loading: true,
			error: null,
		});
	});

	it('should handle fetchOrder.rejected', () => {
		const errorMessage = 'Fetch order failed';
		const action = {
			type: fetchOrder.rejected.type,
			error: { message: errorMessage },
		};
		const nextState = reducer(initialState, action);

		expect(nextState).toEqual({
			...initialState,
			loading: false,
			error: errorMessage,
		});
	});

	it('should handle fetchOrder.fulfilled', () => {
		const action = { type: fetchOrder.fulfilled.type, payload: order };

		expect(reducer(initialState, action)).toEqual({
			...initialState,
			loading: false,
			order,
		});
	});
});
