import { TIngredient } from '@utils/types.ts';
import React, { useState } from 'react';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.css';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';

type TIngredientProps = {
	ingredient: TIngredient;
};

export const IngredientItem = ({
	ingredient,
}: TIngredientProps): React.JSX.Element => {
	const [showIngredientDetails, setShowIngredientDetails] =
		useState<boolean>(false);

	return (
		<div
			role='presentation'
			className={styles.ingredient_item}
			onClick={(e) => {
				e.stopPropagation();
				if (!showIngredientDetails) {
					setShowIngredientDetails(true);
				}
			}}>
			<Counter count={1} size='default' extraClass='m-1' />
			<img
				className='ml-4 mr-4 mb-1'
				src={ingredient.image}
				alt='ingredient_image'
			/>
			<div className={`${styles.price} mb-1`}>
				<span className='text text_type_digits-default mr-2'>
					{ingredient.price}
				</span>
				<CurrencyIcon type='primary' />
			</div>
			<p className={`${styles.name} text text_type_main-default mb-8`}>
				{ingredient.name}
			</p>
			{showIngredientDetails && (
				<Modal onClose={() => setShowIngredientDetails(false)}>
					<IngredientDetails ingredient={ingredient} />
				</Modal>
			)}
		</div>
	);
};
