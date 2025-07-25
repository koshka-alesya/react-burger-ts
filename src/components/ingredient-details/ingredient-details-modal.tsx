import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { getIngredientById } from '@/services/ingredients/ingredients-slice';

export const IngredientDetailsModal = () => {
	const { id } = useParams<{ id: string }>();
	const ingredient = useSelector(getIngredientById(id!));

	if (!ingredient) return null;

	return <IngredientDetails ingredient={ingredient} />;
};
