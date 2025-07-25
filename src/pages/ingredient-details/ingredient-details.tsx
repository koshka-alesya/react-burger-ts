import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	getIngredientById,
	getIngredientsState,
} from '@/services/ingredients/ingredients-slice';
import { IngredientDetails } from '@/components/ingredient-details/ingredient-details';
import styles from './ingredient-details.module.css';
import { useEffect } from 'react';
import { AppDispatch } from '@/services/store';
import Loader from '@/components/loader/loader';
import { loadIngredients } from '@/services/ingredients/actions';

export const IngredientDetailsPage = () => {
	const { id } = useParams<{ id: string }>();
	const ingredient = useSelector(getIngredientById(id!));
	const { error, loading, ingredients } = useSelector(getIngredientsState);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (!ingredients.length) {
			dispatch(loadIngredients());
		}
	}, [ingredients.length, dispatch]);

	if (loading || !ingredients.length) {
		return <Loader />;
	}

	if (!ingredient || error) {
		return null;
	}

	return (
		<main className={styles.ingredient_details}>
			<h1 className='text text_type_main-large mb-4'>Детали ингредиента</h1>
			<IngredientDetails ingredient={ingredient} />
		</main>
	);
};
