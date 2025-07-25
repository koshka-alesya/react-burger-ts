import React, { SyntheticEvent, useCallback } from 'react';
import { BurgerComponents } from '../burger-components/burger-components';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { useModal } from '@/hooks/useModal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/services/store';
import { createOrder } from '@/services/order/actions';
import { getOrderState } from '@/services/order/order-slice';
import {
	getBurgerContructor,
	getBurgerPrice,
	resetBurgerConstructor,
} from '@/services/burger-constructor/burger-constructor-slice';
import Loader from '../loader/loader';
import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): React.JSX.Element => {
	const { isModalOpen, openModal, closeModal } = useModal();
	const { loading } = useSelector(getOrderState);
	const { bun } = useSelector(getBurgerContructor);
	const totalPrice = useSelector(getBurgerPrice);
	const dispatch = useDispatch<AppDispatch>();

	const handleCreateOrder = useCallback(
		async (e: SyntheticEvent) => {
			e.stopPropagation();
			if (loading) {
				return;
			}

			if (!bun) {
				console.warn('Булочка не выбрана, невозможно создать заказ');
				return;
			}

			try {
				await dispatch(createOrder()).unwrap();
				dispatch(resetBurgerConstructor());
				openModal();
			} catch (err) {
				console.error('Ошибка при создании заказа:', err);
			}
		},
		[dispatch, bun, loading, openModal]
	);

	return (
		<section className={styles.burger_constructor}>
			<div className={styles.components}>
				<BurgerComponents />
			</div>
			<div className={styles.info}>
				<p className='text text_type_digits-medium mr-2'>{totalPrice}</p>
				<CurrencyIcon type='primary' className={styles.icon} />
				<Button
					htmlType='button'
					type='primary'
					size='large'
					onClick={handleCreateOrder}>
					Оформить заказ
				</Button>
			</div>
			{isModalOpen && (
				<Modal onClose={closeModal}>
					<OrderDetails />
				</Modal>
			)}
			{loading && <Loader />}
		</section>
	);
};
