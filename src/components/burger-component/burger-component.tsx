import { TIngredient } from '@utils/types.ts';
import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-component.module.css';

type TBurgerComponentProps = {
	ingredient: TIngredient;
	type?: 'top' | 'bottom' | undefined;
	isLocked?: boolean | undefined;
	handleClose?: (() => void) | undefined;
};

export const BurgerComponent = ({
	ingredient,
	type,
	isLocked,
	handleClose,
}: TBurgerComponentProps): React.JSX.Element => {
	const text = `${ingredient.name} ${type == 'top' ? '(верх)' : type == 'bottom' ? '(низ)' : ''}`;
	return (
		<div className={styles.burger_component}>
			<ConstructorElement
				type={type}
				isLocked={isLocked}
				text={text}
				price={ingredient.price}
				thumbnail={ingredient.image}
				handleClose={handleClose}
			/>
		</div>
	);
};
