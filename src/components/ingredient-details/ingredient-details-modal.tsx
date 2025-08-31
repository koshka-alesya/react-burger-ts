import { useParams } from 'react-router-dom';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { getIngredientById } from '@/services/ingredients/ingredients-slice';
import { useAppSelector } from '@/hooks/hooks';

export const IngredientDetailsModal = () => {
	const { id } = useParams<{ id: string }>();
	const ingredient = useAppSelector(getIngredientById(id!));

	if (!ingredient) return null;

	return <IngredientDetails ingredient={ingredient} />;
};
