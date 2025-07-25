import { TIngredient } from '@/utils/types';
import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';

type TBurgerContructorState = {
	bun: TIngredient | null;
	ingredients: TIngredient[];
	ingredientCounts: Record<string, number>;
};

const initialState: TBurgerContructorState = {
	bun: null,
	ingredients: [],
	ingredientCounts: {},
};

export const burgerConstructorSlice = createSlice({
	name: 'burgerСonstructor',
	initialState,
	selectors: {
		getBurgerContructor: (state) => state,
		getIngredientCounts: (state) => state.ingredientCounts,
		getBurgerPrice: (state) => {
			if (!state.bun) {
				return 0;
			}
			let price = state.bun.price;
			state.ingredients.forEach((ingredient) => {
				const ingredientCount = state.ingredientCounts[ingredient._id] || 0;
				price += ingredient.price * ingredientCount;
			});
			return price;
		},
	},
	reducers: {
		addBun(state, action) {
			const updatedCounts = { ...state.ingredientCounts };
			if (state.bun) {
				delete updatedCounts[state.bun._id];
			}
			updatedCounts[action.payload._id] = 1;
			state.ingredientCounts = updatedCounts;
			state.bun = action.payload;
		},
		addIngredient: {
			reducer(state, action: PayloadAction<TIngredient>) {
				const ingredient = action.payload;
				state.ingredients = [...state.ingredients, ingredient];
				state.ingredientCounts = {
					...state.ingredientCounts,
					[ingredient._id]: (state.ingredientCounts[ingredient._id] || 0) + 1,
				};
			},
			prepare(ingredient: TIngredient) {
				return {
					payload: {
						...ingredient,
						uuid: nanoid(),
					},
				};
			},
		},
		removeIngredient(state, action) {
			state.ingredients = state.ingredients.filter(
				(item) => item.uuid !== action.payload.uuid
			);
			const updatedCounts = { ...state.ingredientCounts };

			if (updatedCounts[action.payload._id]) {
				if (updatedCounts[action.payload._id] > 1) {
					updatedCounts[action.payload._id] -= 1;
				} else {
					delete updatedCounts[action.payload._id];
				}
			}
			state.ingredientCounts = updatedCounts;
		},
		resetBurgerConstructor(state) {
			state.bun = null;
			state.ingredients = [];
		},
		moveIngredient(state, action) {
			const ingredients = [...state.ingredients];
			ingredients.splice(
				action.payload.toIndex,
				0,
				ingredients.splice(action.payload.fromIndex, 1)[0]
			);
			state.ingredients = ingredients;
		},
	},
});

export const { getBurgerContructor, getIngredientCounts, getBurgerPrice } =
	burgerConstructorSlice.selectors;
export const {
	addBun,
	addIngredient,
	removeIngredient,
	resetBurgerConstructor,
	moveIngredient,
} = burgerConstructorSlice.actions;
