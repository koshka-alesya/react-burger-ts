import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOrder } from '@/services/get-order/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder, getOrderState } from '@/services/get-order/get-order-slice';
import { AppDispatch } from '@/services/store';
import Loader from '@/components/loader/loader';
import { OrderInfo } from '@/components/order-info/order-info';
import styles from './order-info.module.css';

export const OrderInfoModal = (): React.JSX.Element | null => {
	const { number } = useParams<{ number: string }>();
	const dispatch = useDispatch<AppDispatch>();

	const { error, loading } = useSelector(getOrderState);
	const order = useSelector(getOrder);

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
