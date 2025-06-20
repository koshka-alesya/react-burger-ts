import { TIngredient } from '@utils/types.ts';
import React, { useMemo } from 'react';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-components.module.css';
import { BurgerComponent } from '../burger-component/burger-component';

type TBurgerComponentsProps = {
	ingredients: TIngredient[];
};

export const BurgerComponents = ({
	ingredients,
}: TBurgerComponentsProps): React.JSX.Element | null => {
	const bun = useMemo(
		() => ingredients.find((item) => item.type === 'bun'),
		[ingredients]
	);
	const filling = useMemo(
		() => ingredients.filter((item) => item.type !== 'bun'),
		[ingredients]
	);

	if (!bun) {
		return null;
	}

	return (
		<ul className={styles.burger_components}>
			<li className={styles.item}>
				<div className={styles.icon}></div>
				<BurgerComponent ingredient={bun} type='top' isLocked={true} />
			</li>
			<li className={styles.filling}>
				<ul className={styles.list}>
					{filling.map((ingredient) => (
						<li className={styles.item} key={ingredient._id}>
							<DragIcon
								type='primary'
								className={`${styles.icon} ${styles.icon_draggable}`}
							/>
							<BurgerComponent ingredient={ingredient} />
						</li>
					))}
				</ul>
			</li>
			<li className={styles.item}>
				<div className={styles.icon}></div>
				<BurgerComponent ingredient={bun} type='bottom' isLocked={true} />
			</li>
		</ul>
	);
};
