import React, { useEffect } from 'react';
import styles from './order-info.module.css';
import { useParams } from 'react-router-dom';
import { fetchOrder } from '@/services/get-order/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder, getOrderState } from '@/services/get-order/get-order-slice';
import { AppDispatch } from '@/services/store';
import Loader from '@/components/loader/loader';
import { OrderInfo } from '@/components/order-info/order-info';

export const OrderInfoPage = (): React.JSX.Element | null => {
	const { number } = useParams<{ number: string }>();
	const dispatch = useDispatch<AppDispatch>();

	const { error, loading } = useSelector(getOrderState);
	const order = useSelector(getOrder);

	useEffect(() => {
		if (number) {
			dispatch(fetchOrder(number));
		}
	}, [dispatch, number]);

	if (loading || !order) {
		return <Loader />;
	}

	if (error) {
		return null;
	}

	return (
		<main className={styles.order_info}>
			<OrderInfo order={order} />
		</main>
	);
};
