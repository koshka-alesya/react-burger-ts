import React, { useMemo, useState } from 'react';
import styles from './burger-ingredients.module.css';
import { TIngredient } from '@utils/types.ts';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsGroup } from '../ingredients-group/ingredients-group';

type TBurgerIngredientsProps = {
	ingredients: TIngredient[];
};

export const BurgerIngredients = ({
	ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
	const [active, setActive] = useState<string>('bun');

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
						<IngredientsGroup ingredients={buns} />
					</li>
					<li className='mt-10'>
						<p className='text text_type_main-medium mb-6 '>Начинки</p>
						<IngredientsGroup ingredients={mains} />
					</li>
					<li className='mt-10 mb-10'>
						<p className='text text_type_main-medium mb-6'>Соусы</p>
						<IngredientsGroup ingredients={sauces} />
					</li>
				</ul>
			</nav>
		</section>
	);
};
