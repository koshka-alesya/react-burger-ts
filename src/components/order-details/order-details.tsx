import React from 'react';
import done from '../../images/done.png';
import styles from './order-details.module.css';

type TOrderDetailsProps = {
	orderId: string;
	status?: string;
};

export const OrderDetails = ({
	orderId,
}: TOrderDetailsProps): React.JSX.Element => {
	return (
		<div className={`${styles.order_details} mb-20 mt-4 `}>
			<p
				className={`${styles.order_details_number} text text_type_digits-large mb-8`}>
				{orderId}
			</p>
			<p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
			<img className='mb-15' src={done} alt='done' />
			<p className='text text_type_main-default mb-2'>
				Ваш заказ начали готовить
			</p>
			<p className='text text_type_main-default text_color_inactive'>
				Дождитесь готовности на орбитальной станции
			</p>
		</div>
	);
};
