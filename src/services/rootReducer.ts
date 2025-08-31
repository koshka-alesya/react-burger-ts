import { combineSlices } from '@reduxjs/toolkit';
import { ingredientsSlice } from '../services/ingredients/ingredients-slice';
import { burgerConstructorSlice } from './burger-constructor/burger-constructor-slice';
import { createOrderSlice } from './create-order/create-order-slice';
import { selectedIngredientSlice } from './selected-ingredient/selected-ingredient-slice';
import { userSlice } from './user/user-slice';
import { allOrdersSlice } from './all-orders/all-orders-slice';
import { getOrderSlice } from './get-order/get-order-slice';
import { userOrdersSlice } from './user-orders/user-orders-slice';

export const rootReducer = combineSlices(
	ingredientsSlice,
	burgerConstructorSlice,
	createOrderSlice,
	getOrderSlice,
	selectedIngredientSlice,
	userSlice,
	allOrdersSlice,
	userOrdersSlice
);

export type ReduxStore = ReturnType<typeof rootReducer>;
