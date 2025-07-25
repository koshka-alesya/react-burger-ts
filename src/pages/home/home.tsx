import React, { useEffect } from 'react';
import styles from './home.module.css';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.tsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { loadIngredients } from '@/services/ingredients/actions';
import { AppDispatch } from '@/services/store';
import { getIngredientsState } from '@/services/ingredients/ingredients-slice';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Loader from '@/components/loader/loader';

export const HomePage = (): React.JSX.Element | null => {
	const { error, loading } = useSelector(getIngredientsState);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(loadIngredients());
	}, []);

	if (error) {
		return null;
	}

	return (
		<div className={styles.home}>
			<h1
				className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
				Соберите бургер
			</h1>
			<main className={`${styles.main} pl-5 pr-5`}>
				<DndProvider backend={HTML5Backend}>
					<BurgerIngredients />
					<BurgerConstructor />
				</DndProvider>
			</main>
			{loading && <Loader />}
		</div>
	);
};
