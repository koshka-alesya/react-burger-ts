import React, { useEffect, useState } from 'react';
import styles from './app.module.css';
import { TIngredient } from '@utils/types.ts';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.tsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.tsx';
import { AppHeader } from '@components/app-header/app-header.tsx';

const API_INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';

export const App = (): React.JSX.Element | null => {
	const [ingredients, setIngredients] = useState<TIngredient[] | null>(null);
	const [hasError, setHasError] = useState<boolean>(false);

	useEffect(() => {
		fetch(API_INGREDIENTS_URL)
			.then((res) => {
				if (!res.ok) throw new Error('HTTP Error');
				return res.json();
			})
			.then((data) => {
				if (data.success) {
					setIngredients(data.data);
				} else {
					setHasError(true);
				}
			})
			.catch(() => {
				setHasError(true);
			});
	}, []);

	if (!ingredients || hasError) {
		return null;
	}

	return (
		<div className={styles.app}>
			<AppHeader />
			<h1
				className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
				Соберите бургер
			</h1>
			<main className={`${styles.main} pl-5 pr-5`}>
				<BurgerIngredients ingredients={ingredients} />
				<BurgerConstructor ingredients={ingredients} />
			</main>
		</div>
	);
};

export default App;
