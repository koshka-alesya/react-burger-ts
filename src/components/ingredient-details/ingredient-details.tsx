import React from 'react';
import { TIngredient } from '@utils/types.ts';
import styles from './ingredient-details.module.css';

type TIngredientDetails = {
	ingredient: TIngredient;
};

export const IngredientDetails = ({
	ingredient,
}: TIngredientDetails): React.JSX.Element => {
	return (
		<div className={styles.ingredient_details}>
			<img
				className={`${styles.image} mb-4`}
				src={ingredient.image_large}
				alt='ingredient_image'
			/>
			<p className='text text_type_main-medium mb-8'>{ingredient.name}</p>
			<div className={`${styles.bju} mb-5`}>
				<div className={`${styles.bju_item} mr-5 text_color_inactive`}>
					<p className='text text_type_main-default mb-2'>Калории,ккал</p>
					<p className='text text_type_digits-default'>{ingredient.calories}</p>
				</div>
				<div
					className={`${styles.bju_item} mr-5 text text_type_main-default text_color_inactive`}>
					<p className='text text_type_main-default mb-2'>Белки, г</p>
					<p className='text text_type_digits-default'>{ingredient.proteins}</p>
				</div>
				<div
					className={`${styles.bju_item} mr-5 text text_type_main-default text_color_inactive`}>
					<p className='text text_type_main-default mb-2'>Жиры, г</p>
					<p className='text text_type_digits-default'>{ingredient.fat}</p>
				</div>
				<div
					className={`${styles.bju_item} text text_type_main-default text_color_inactive`}>
					<p className='text text_type_main-default mb-2'>Углеводы, г</p>
					<p className='text text_type_digits-default'>
						{ingredient.carbohydrates}
					</p>
				</div>
			</div>
		</div>
	);
};
