import { TIngredient } from '@/utils/types';
import {
	TSelectedIngredientState,
	clearSelectedIngredient,
	selectedIngredientSlice,
	setSelectedIngredient,
} from './selected-ingredient-slice';

const reducer = selectedIngredientSlice.reducer;

const initialState: TSelectedIngredientState = {
	ingredient: null,
};

const ingredient: TIngredient = {
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
	__v: 1,
};

describe('selectedIngredientSlice reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, { type: '' })).toEqual(initialState);
	});

	it('should handle setSelectedIngredient', () => {
		expect(reducer(initialState, setSelectedIngredient(ingredient))).toEqual({
			...initialState,
			ingredient,
		});
	});

	it('should handle clearSelectedIngredient', () => {
		expect(reducer(initialState, clearSelectedIngredient())).toEqual({
			...initialState,
			ingredient: null,
		});
	});
});
