import React from 'react';
import done from '../../images/done.png';
import styles from './order-details.module.css';
import { getOrderState } from '@/services/create-order/create-order-slice';
import { useAppSelector } from '@/hooks/hooks';

export const OrderDetails = (): React.JSX.Element | null => {
	const { order } = useAppSelector(getOrderState);

	if (!order) {
		return null;
	}

	return (
		<div
			className={`${styles.order_details} mb-20 mt-4 `}
			data-cy='order-details'>
			<p
				className={`${styles.order_id} text text_type_digits-large mb-8`}
				data-cy='order-details-number'>
				{order.order.number}
			</p>
			<p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
			<img className='mb-15' src={done} alt='Подтверждение заказа' />
			<p className='text text_type_main-default mb-2'>
				Ваш заказ начали готовить
			</p>
			<p className='text text_type_main-default text_color_inactive'>
				Дождитесь готовности на орбитальной станции
			</p>
		</div>
	);
};
