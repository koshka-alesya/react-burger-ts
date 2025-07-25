import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@/utils/types';

type TSelectedIngredientState = {
	ingredient: TIngredient | null;
};

const initialState: TSelectedIngredientState = {
	ingredient: null,
};

export const selectedIngredientSlice = createSlice({
	name: 'selectedIngredient',
	initialState,
	reducers: {
		setSelectedIngredient(state, action) {
			state.ingredient = action.payload;
		},
		clearSelectedIngredient(state) {
			state.ingredient = null;
		},
	},
	selectors: {
		getSelectedIngredient: (state) => state.ingredient,
	},
});

export const { getSelectedIngredient } = selectedIngredientSlice.selectors;
export const { setSelectedIngredient, clearSelectedIngredient } =
	selectedIngredientSlice.actions;
