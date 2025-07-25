import { combineSlices } from '@reduxjs/toolkit';
import { ingredientsSlice } from '../services/ingredients/ingredients-slice';
import { burgerConstructorSlice } from './burger-constructor/burger-constructor-slice';
import { orderSlice } from './order/order-slice';
import { selectedIngredientSlice } from './selected-ingredient/selected-ingredient-slice';

export const rootReducer = combineSlices(
	ingredientsSlice,
	burgerConstructorSlice,
	orderSlice,
	selectedIngredientSlice
);
