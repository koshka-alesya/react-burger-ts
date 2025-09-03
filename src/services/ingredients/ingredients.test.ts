import { loadIngredients } from './actions';
import { ingredientsSlice, initialState } from './ingredients-slice';

const reducer = ingredientsSlice.reducer;

const ingredients = {
	success: true,
	data: {
		_id: '643d69a5c3f7b9001cfa093c',
		name: 'Краторная булка N-200i',
		type: 'bun',
		proteins: 80,
		fat: 24,
		carbohydrates: 53,
		calories: 420,
		price: 1255,
		image: 'https://code.s3.yandex.net/react/code/bun-02.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
		__v: 0,
	},
};

describe('ingredientsSlice reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, { type: '' })).toEqual(initialState);
	});

	// LOAD INGREDIENTS
	it('should handle loadIngredients.pending', () => {
		const action = { type: loadIngredients.pending.type };
		const nextState = reducer(initialState, action);

		expect(nextState).toEqual({
			...initialState,
			loading: true,
			error: null,
		});
	});

	it('should handle loadIngredients.rejected', () => {
		const errorMessage = 'Load ingredients failed';
		const action = {
			type: loadIngredients.rejected.type,
			error: { message: errorMessage },
		};
		const nextState = reducer(initialState, action);

		expect(nextState).toEqual({
			...initialState,
			loading: false,
			error: errorMessage,
		});
	});

	it('should handle loadIngredients.fulfilled', () => {
		const action = {
			type: loadIngredients.fulfilled.type,
			payload: ingredients,
		};

		expect(reducer(initialState, action)).toEqual({
			...initialState,
			loading: false,
			ingredients: ingredients.data,
		});
	});
});
