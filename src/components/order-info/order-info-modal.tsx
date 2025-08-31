import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOrder } from '@/services/get-order/actions';
import { getOrder, getOrderState } from '@/services/get-order/get-order-slice';
import Loader from '@/components/loader/loader';
import { OrderInfo } from '@/components/order-info/order-info';
import styles from './order-info.module.css';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';

export const OrderInfoModal = (): React.JSX.Element | null => {
	const { number } = useParams<{ number: string }>();
	const dispatch = useAppDispatch();

	const { error, loading } = useAppSelector(getOrderState);
	const order = useAppSelector(getOrder);

	useEffect(() => {
		if (number) {
			dispatch(fetchOrder(number));
		}
	}, [dispatch, number]);

	if (error) {
		return null;
	}

	return (
		<div className={styles.modal}>
			{loading && <Loader />}
			{!loading && order && <OrderInfo order={order} />}
		</div>
	);
};
