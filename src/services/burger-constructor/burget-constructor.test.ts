import {
	addBun,
	addIngredient,
	burgerConstructorSlice,
	moveIngredient,
	removeIngredient,
	resetBurgerConstructor,
} from './burger-constructor-slice';
import { TIngredient } from '@/utils/types';

const reducer = burgerConstructorSlice.reducer;

const initialState = {
	bun: null,
	ingredients: [],
	ingredientCounts: {},
};

const bun: TIngredient = {
	_id: 'bun1',
	name: 'Bun',
	type: 'bun',
	proteins: 10,
	fat: 5,
	carbohydrates: 20,
	calories: 200,
	price: 50,
	image: '',
	image_large: '',
	image_mobile: '',
	__v: 0,
};

const ingredient1: TIngredient = {
	_id: 'ing1',
	name: 'Lettuce',
	type: 'main',
	proteins: 1,
	fat: 0,
	carbohydrates: 2,
	calories: 10,
	price: 5,
	image: '',
	image_large: '',
	image_mobile: '',
	__v: 0,
};

const ingredient2: TIngredient = {
	_id: 'ing2',
	name: 'Tomato',
	type: 'main',
	proteins: 1,
	fat: 0,
	carbohydrates: 3,
	calories: 15,
	price: 7,
	image: '',
	image_large: '',
	image_mobile: '',
	__v: 0,
};

describe('burgerConstructorSlice reducers', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, { type: '' })).toEqual(initialState);
	});

	it('should handle addBun', () => {
		const nextState = reducer(initialState, addBun(bun));
		expect(nextState.bun).toEqual(bun);
		expect(nextState.ingredientCounts).toEqual({ [bun._id]: 1 });

		const newBun = { ...bun, _id: 'bun2' };
		const updatedState = reducer(nextState, addBun(newBun));
		expect(updatedState.bun?._id).toBe('bun2');
		expect(updatedState.ingredientCounts).toEqual({ ['bun2']: 1 });
	});

	it('should handle addIngredient', () => {
		const action = addIngredient(ingredient1);
		const nextState = reducer(initialState, action);
		expect(nextState.ingredients.length).toBe(1);
		expect(nextState.ingredients[0]._id).toBe('ing1');
		expect(nextState.ingredientCounts['ing1']).toBe(1);

		const nextState2 = reducer(nextState, addIngredient(ingredient1));
		expect(nextState2.ingredients.length).toBe(2);
		expect(nextState2.ingredientCounts['ing1']).toBe(2);
	});

	it('should handle removeIngredient', () => {
		let state = reducer(initialState, addIngredient(ingredient1));
		state = reducer(state, addIngredient(ingredient1));
		state = reducer(state, addIngredient(ingredient2));

		const uuidToRemove = state.ingredients[0].uuid;
		state = reducer(
			state,
			removeIngredient({ _id: 'ing1', uuid: uuidToRemove })
		);
		expect(state.ingredients.length).toBe(2);
		expect(state.ingredientCounts['ing1']).toBe(1);

		const uuidToRemove2 = state.ingredients.find((i) => i._id === 'ing1')?.uuid;
		if (uuidToRemove2) {
			state = reducer(
				state,
				removeIngredient({ _id: 'ing1', uuid: uuidToRemove2 })
			);
			expect(state.ingredientCounts['ing1']).toBeUndefined();
		}
	});

	it('should handle resetBurgerConstructor', () => {
		let state = reducer(initialState, addBun(bun));
		state = reducer(state, addIngredient(ingredient1));
		state = reducer(state, resetBurgerConstructor());
		expect(state).toEqual(initialState);
	});

	it('should handle moveIngredient', () => {
		let state = reducer(initialState, addIngredient(ingredient1));
		state = reducer(state, addIngredient(ingredient2));
		const fromIndex = 0;
		const toIndex = 1;
		state = reducer(state, moveIngredient({ fromIndex, toIndex }));
		expect(state.ingredients[0]._id).toBe('ing2');
		expect(state.ingredients[1]._id).toBe('ing1');
	});
});
