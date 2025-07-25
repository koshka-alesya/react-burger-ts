import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './burger-ingredients.module.css';
import { TIngredient } from '@utils/types.ts';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsGroup } from '../ingredients-group/ingredients-group';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import {
	getBuns,
	getMains,
	getSauces,
} from '@/services/ingredients/ingredients-slice';
import { AppDispatch } from '@/services/store';
import {
	clearSelectedIngredient,
	getSelectedIngredient,
	setSelectedIngredient,
} from '@/services/selected-ingredient/selected-ingredient-slice';

export const BurgerIngredients = (): React.JSX.Element => {
	const [active, setActive] = useState<'bun' | 'sauce' | 'main'>('bun');
	const { isModalOpen, openModal, closeModal } = useModal();
	const buns: TIngredient[] = useSelector(getBuns);
	const mains: TIngredient[] = useSelector(getMains);
	const sauces: TIngredient[] = useSelector(getSauces);
	const selectedIngredient: TIngredient | null = useSelector(
		getSelectedIngredient
	);
	const dispatch = useDispatch<AppDispatch>();
	const containerRef = useRef<HTMLUListElement | null>(null);
	const bunRef = useRef<HTMLLIElement | null>(null);
	const sauceRef = useRef<HTMLLIElement | null>(null);
	const mainRef = useRef<HTMLLIElement | null>(null);

	const showIngredient = useCallback(
		(ingredient: TIngredient) => {
			dispatch(setSelectedIngredient(ingredient));
			openModal();
		},
		[openModal, dispatch]
	);

	const closeIngredient = useCallback(() => {
		dispatch(clearSelectedIngredient());
		closeModal();
	}, [closeModal, dispatch]);

	const handleScroll = useCallback(() => {
		if (
			!containerRef.current ||
			!bunRef.current ||
			!sauceRef.current ||
			!mainRef.current
		)
			return;

		const containerTop = containerRef.current.getBoundingClientRect().top;
		const bunTop = Math.abs(
			bunRef.current.getBoundingClientRect().top - containerTop
		);
		const sauceTop = Math.abs(
			sauceRef.current.getBoundingClientRect().top - containerTop
		);
		const mainTop = Math.abs(
			mainRef.current.getBoundingClientRect().top - containerTop
		);

		const min = Math.min(bunTop, sauceTop, mainTop);
		if (min === bunTop) setActive('bun');
		else if (min === mainTop) setActive('main');
		else if (min === sauceTop) setActive('sauce');
	}, []);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;
		container.addEventListener('scroll', handleScroll);
		return () => {
			container.removeEventListener('scroll', handleScroll);
		};
	}, [handleScroll]);

	return (
		<section className={styles.burger_ingredients}>
			<nav className={styles.nav}>
				<ul className={styles.menu}>
					<Tab value='bun' active={active == 'bun'} onClick={() => {}}>
						Булки
					</Tab>
					<Tab value='main' active={active == 'main'} onClick={() => {}}>
						Начинки
					</Tab>
					<Tab value='sauce' active={active == 'sauce'} onClick={() => {}}>
						Соусы
					</Tab>
				</ul>
				<ul className={styles.ingredients} ref={containerRef}>
					<li className='mt-10' ref={bunRef}>
						<p className='text text_type_main-medium mb-6'>Булки</p>
						<IngredientsGroup ingredients={buns} onClick={showIngredient} />
					</li>
					<li className='mt-10' ref={mainRef}>
						<p className='text text_type_main-medium mb-6 '>Начинки</p>
						<IngredientsGroup ingredients={mains} onClick={showIngredient} />
					</li>
					<li className='mt-10 mb-10' ref={sauceRef}>
						<p className='text text_type_main-medium mb-6'>Соусы</p>
						<IngredientsGroup ingredients={sauces} onClick={showIngredient} />
					</li>
				</ul>
			</nav>
			{isModalOpen && selectedIngredient && (
				<Modal onClose={closeIngredient} header={'Детали ингредиента'}>
					<IngredientDetails ingredient={selectedIngredient} />
				</Modal>
			)}
		</section>
	);
};
