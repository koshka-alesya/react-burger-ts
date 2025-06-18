import { TIngredient } from '@utils/types.ts';
import React from 'react';
import { IngredientItem } from '../ingredient-item/ingredient-item';
import styles from './ingredients-group.module.css';

type TIngredientProps = {
	ingredients: TIngredient[];
	onClick: (ingredient: TIngredient) => void;
};

export const IngredientsGroup = ({
	ingredients,
	onClick,
}: TIngredientProps): React.JSX.Element => {
	return (
		<ul className={`${styles.ingredients_group} mr-4 ml-4`}>
			{ingredients.map((ingredient) => (
				<li key={ingredient._id}>
					<IngredientItem ingredient={ingredient} onClick={onClick} />
				</li>
			))}
		</ul>
	);
};
