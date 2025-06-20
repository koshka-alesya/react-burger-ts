import { TIngredient } from '@utils/types.ts';
import React from 'react';
import { BurgerComponents } from '../burger-components/burger-components';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { useModal } from '@/hooks/useModal';
import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
	ingredients: TIngredient[];
};

export const BurgerConstructor = ({
	ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
	const { isModalOpen, openModal, closeModal } = useModal();

	return (
		<section className={styles.burger_constructor}>
			<div className={styles.components}>
				<BurgerComponents ingredients={ingredients} />
			</div>
			<div className={styles.info}>
				<p className='text text_type_digits-medium mr-2'>610</p>
				<CurrencyIcon type='primary' className={styles.icon} />
				<Button
					htmlType='button'
					type='primary'
					size='large'
					onClick={(e) => {
						e.stopPropagation();
						openModal();
					}}>
					Оформить заказ
				</Button>
			</div>
			{isModalOpen && (
				<Modal onClose={closeModal}>
					<OrderDetails orderId='000000' />
				</Modal>
			)}
		</section>
	);
};
