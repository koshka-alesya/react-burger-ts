import { fetchIngredients } from '../../utils/api/ingredients-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadIngredients = createAsyncThunk(
	'ingredients/loadIngredients',
	fetchIngredients
);
