import React, { useEffect } from 'react';
import styles from './order-info.module.css';
import { useParams } from 'react-router-dom';
import { fetchOrder } from '@/services/get-order/actions';
import { getOrder, getOrderState } from '@/services/get-order/get-order-slice';
import Loader from '@/components/loader/loader';
import { OrderInfo } from '@/components/order-info/order-info';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';

export const OrderInfoPage = (): React.JSX.Element | null => {
	const { number } = useParams<{ number: string }>();
	const dispatch = useAppDispatch();

	const { error, loading } = useAppSelector(getOrderState);
	const order = useAppSelector(getOrder);

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
