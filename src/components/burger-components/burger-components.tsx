import React, { useCallback } from 'react';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-components.module.css';
import { BurgerComponent } from '../burger-component/burger-component';
import {
	getBurgerContructor,
	moveIngredient,
	removeIngredient,
	addBun,
	addIngredient,
} from '@/services/burger-constructor/burger-constructor-slice';
import { TIngredient } from '@/utils/types';
import { DropTarget } from '../dnd/drop-target/drop-target';
import { DragItem } from '../dnd/drag-item/drag-item';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';

export const BurgerComponents = (): React.JSX.Element | null => {
	const { bun, ingredients } = useAppSelector(getBurgerContructor);
	const dispatch = useAppDispatch();

	const handleDrop = useCallback(
		(item: TIngredient) => {
			if (item.type === 'bun') {
				dispatch(addBun(item));
			} else {
				dispatch(addIngredient(item));
			}
		},
		[dispatch]
	);

	const deleteIngredient = useCallback(
		(item: TIngredient) => {
			dispatch(removeIngredient(item));
		},
		[dispatch]
	);

	const moveItem = useCallback(
		(toIndex: number, fromIndex: number) => {
			dispatch(moveIngredient({ toIndex, fromIndex }));
		},
		[dispatch]
	);

	return (
		<DropTarget onDropHandler={handleDrop} accept='ingredient'>
			<ul className={styles.burger_components} data-cy='burger-component'>
				{bun && (
					<li className={styles.item}>
						<div className={styles.icon}></div>
						<BurgerComponent ingredient={bun} type='top' isLocked={true} />
					</li>
				)}
				<li className={styles.filling}>
					<ul className={styles.list}>
						{ingredients.map((ingredient, index) => (
							<DragItem
								key={ingredient.uuid}
								id={ingredient.uuid || ingredient._id}
								index={index}
								moveItem={moveItem}>
								<div className={styles.item}>
									<DragIcon
										type='primary'
										className={`${styles.icon} ${styles.icon_draggable}`}
									/>
									<BurgerComponent
										ingredient={ingredient}
										handleClose={() => deleteIngredient(ingredient)}
									/>
								</div>
							</DragItem>
						))}
					</ul>
				</li>
				{bun && (
					<li className={styles.item}>
						<div className={styles.icon}></div>
						<BurgerComponent ingredient={bun} type='bottom' isLocked={true} />
					</li>
				)}
			</ul>
		</DropTarget>
	);
};
