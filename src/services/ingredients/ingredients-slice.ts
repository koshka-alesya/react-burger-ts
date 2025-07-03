import { createSelector, createSlice } from '@reduxjs/toolkit';
import { loadIngredients } from './actions';
import { TIngredient } from '@/utils/types';

type TIngredientsState = {
	ingredients: TIngredient[];
	loading: boolean;
	error: string | null;
};

const initialState: TIngredientsState = {
	ingredients: [],
	loading: false,
	error: null,
};

export const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	selectors: {
		getIngredients: (state) => state.ingredients,
		getIngredientsState: (state) => state,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loadIngredients.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loadIngredients.rejected, (state, action) => {
				state.error = action.error?.message ?? 'Unknown error';
				state.loading = false;
			})
			.addCase(loadIngredients.fulfilled, (state, action) => {
				state.loading = false;
				if (!action.payload.success) {
					state.error = 'Unknown error';
				} else {
					state.ingredients = action.payload.data;
				}
			});
	},
});

export const { getIngredients, getIngredientsState } =
	ingredientsSlice.selectors;

export const getBuns = createSelector([getIngredients], (items) => {
	return items.filter((item) => item.type === 'bun');
});

export const getMains = createSelector([getIngredients], (items) => {
	return items.filter((item) => item.type === 'main');
});

export const getSauces = createSelector([getIngredients], (items) => {
	return items.filter((item) => item.type === 'sauce');
});
