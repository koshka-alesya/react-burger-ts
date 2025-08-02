import { TIngredient } from '@utils/types.ts';
import React from 'react';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import styles from './ingredient-item.module.css';
import { useSelector } from 'react-redux';
import { getIngredientCounts } from '@/services/burger-constructor/burger-constructor-slice';
import { Link, useLocation } from 'react-router-dom';
type TIngredientProps = {
	ingredient: TIngredient;
};

export const IngredientItem = ({
	ingredient,
}: TIngredientProps): React.JSX.Element => {
	const location = useLocation();
	const counts = useSelector(getIngredientCounts);
	const count = counts[ingredient._id];

	const [, dragRef] = useDrag({
		type: 'ingredient',
		item: ingredient,
	});

	return (
		<Link
			key={ingredient._id}
			to={`/ingredients/${ingredient._id}`}
			state={{ background: location }}
			className={styles.link}>
			<div ref={dragRef} className={styles.ingredient_item}>
				{count && <Counter count={count} size='default' extraClass='m-1' />}
				<img
					className='ml-4 mr-4 mb-1'
					src={ingredient.image}
					alt={ingredient.name}
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
			</div>
		</Link>
	);
};
