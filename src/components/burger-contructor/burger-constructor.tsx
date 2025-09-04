import React, { SyntheticEvent, useCallback } from 'react';
import { BurgerComponents } from '../burger-components/burger-components';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { useModal } from '@/hooks/useModal';
import { createOrder } from '@/services/create-order/actions';
import { getOrderState } from '@/services/create-order/create-order-slice';
import {
	getBurgerContructor,
	getBurgerPrice,
	resetBurgerConstructor,
} from '@/services/burger-constructor/burger-constructor-slice';
import Loader from '../loader/loader';
import styles from './burger-constructor.module.css';
import { getUser } from '@/services/user/user-slice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';

export const BurgerConstructor = (): React.JSX.Element => {
	const { isModalOpen, openModal, closeModal } = useModal();
	const { loading } = useAppSelector(getOrderState);
	const { bun } = useAppSelector(getBurgerContructor);
	const user = useAppSelector(getUser);
	const totalPrice = useAppSelector(getBurgerPrice);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleCreateOrder = useCallback(
		async (e: SyntheticEvent) => {
			e.stopPropagation();

			if (!user) {
				navigate('/login');
				return;
			}

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
		[dispatch, bun, loading, openModal, navigate, user]
	);

	return (
		<section className={styles.burger_constructor}>
			<div className={styles.components}>
				<BurgerComponents />
			</div>
			<div className={styles.info}>
				<p
					className='text text_type_digits-medium mr-2'
					data-cy='burger-constructor-price'>
					{totalPrice}
				</p>
				<CurrencyIcon type='primary' className={styles.icon} />
				<Button
					htmlType='button'
					type='primary'
					size='large'
					data-cy='burger-constructor-create-order'
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
