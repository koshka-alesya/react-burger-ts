import React from 'react';
import { OrderStatus, TOrderProcessed } from '@/utils/types';
import { AvatarGroup } from '../avatar-group/avatar-group';
import { formatRelativeDate } from '@/utils/date';
import styles from './card-order.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type TCardOrder = {
	order: TOrderProcessed;
	personal?: boolean;
};

export const CardOrder = ({
	order,
	personal,
}: TCardOrder): React.JSX.Element | null => {
	return (
		<div className={`${styles.card_order}`}>
			<div className={`${styles.header} mb-6`}>
				<p className={'text text_type_digits-default'}>#{order.number}</p>
				<p className={'text text_type_main-default text_color_inactive'}>
					{formatRelativeDate(order.createdAt)}
				</p>
			</div>

			<p className={'text text_type_main-medium mb-2'}>{order.name}</p>
			{personal && (
				<p
					className={`${styles.status} ${styles[order.status]} text text_type_main-default mb-6`}>
					{OrderStatus[order.status]}
				</p>
			)}
			<div className={styles.footer}>
				{order.ingredientImages && (
					<AvatarGroup images={order.ingredientImages} />
				)}
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
