import React from 'react';
import styles from './order-info.module.css';
import { OrderStatus, TOrderProcessed } from '@/utils/types';
import { formatRelativeDate } from '@/utils/date';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type TOrderInfo = {
	order: TOrderProcessed;
};

export const OrderInfo = ({ order }: TOrderInfo): React.JSX.Element | null => {
	if (!order) {
		return null;
	}

	return (
		<div className={`${styles.order_info}`}>
			<p className={`${styles.number} text text_type_digits-default mb-10`}>
				#{order.number}
			</p>
			<p className={'text text_type_main-medium mb-3'}>{order.name}</p>
			<p
				className={`${styles.status} ${styles[order.status]} text text_type_main-default mb-15`}>
				{OrderStatus[order.status]}
			</p>

			<p className={'text text_type_main-medium mb-8'}>Состав:</p>
			<div className={`${styles.container} pr-6 mb-10`}>
				<ul className={`${styles.list}`}>
					{order.ingredientsData.map((item, index) => {
						return (
							<li className={styles.item} key={item._id}>
								<div className={`${styles.circle} mr-4`}>
									<img
										className={`${styles.image}`}
										src={item.image_mobile}
										alt={`avatar-${index}`}
									/>
								</div>
								<p className={'text text_type_main-default mr-4'}>
									{item.name}
								</p>
								<div className={styles.price}>
									<p className={'text text_type_digits-default mr-2'}>
										{item.count} x {item.price}
									</p>
									<CurrencyIcon type='primary' />
								</div>
							</li>
						);
					})}
				</ul>
			</div>

			<div className={styles.footer}>
				<p className={'text text_type_main-default text_color_inactive'}>
					{formatRelativeDate(order.createdAt)}
				</p>
				<div className={styles.price}>
					<p className={'text text_type_digits-default mr-2'}>
						{order.totalPrice}
					</p>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);
};
