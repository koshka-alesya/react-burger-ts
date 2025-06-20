import React, { useCallback, useMemo, useState } from 'react';
import styles from './burger-ingredients.module.css';
import { TIngredient } from '@utils/types.ts';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsGroup } from '../ingredients-group/ingredients-group';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
type TBurgerIngredientsProps = {
	ingredients: TIngredient[];
};

export const BurgerIngredients = ({
	ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
	const { isModalOpen, openModal, closeModal } = useModal();

	const [active, setActive] = useState<string>('bun');
	const [selectedIngredient, setSelectedIngredient] =
		useState<TIngredient | null>(null);

	const buns = useMemo(
		() => ingredients.filter((item) => item.type === 'bun'),
		[ingredients]
	);
	const mains = useMemo(
		() => ingredients.filter((item) => item.type === 'main'),
		[ingredients]
	);
	const sauces = useMemo(
		() => ingredients.filter((item) => item.type === 'sauce'),
		[ingredients]
	);

	const showIngredient = useCallback(
		(ingredient: TIngredient) => {
			setSelectedIngredient(ingredient);
			openModal();
		},
		[openModal]
	);

	return (
		<section className={styles.burger_ingredients}>
			<nav className={styles.nav}>
				<ul className={styles.menu}>
					<Tab
						value='bun'
						active={active == 'bun'}
						onClick={() => {
							setActive('bun');
						}}>
						Булки
					</Tab>
					<Tab
						value='main'
						active={active == 'main'}
						onClick={() => {
							setActive('main');
						}}>
						Начинки
					</Tab>
					<Tab
						value='sauce'
						active={active == 'sauce'}
						onClick={() => {
							setActive('sauce');
						}}>
						Соусы
					</Tab>
				</ul>
				<ul className={styles.ingredients}>
					<li className='mt-10'>
						<p className='text text_type_main-medium mb-6'>Булки</p>
						<IngredientsGroup ingredients={buns} onClick={showIngredient} />
					</li>
					<li className='mt-10'>
						<p className='text text_type_main-medium mb-6 '>Начинки</p>
						<IngredientsGroup ingredients={mains} onClick={showIngredient} />
					</li>
					<li className='mt-10 mb-10'>
						<p className='text text_type_main-medium mb-6'>Соусы</p>
						<IngredientsGroup ingredients={sauces} onClick={showIngredient} />
					</li>
				</ul>
			</nav>
			{isModalOpen && selectedIngredient && (
				<Modal onClose={closeModal} header={'Детали ингредиента'}>
					<IngredientDetails ingredient={selectedIngredient} />
				</Modal>
			)}
		</section>
	);
};
