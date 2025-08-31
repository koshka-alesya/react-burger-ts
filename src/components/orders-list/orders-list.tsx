import React from 'react';
import { CardOrder } from '../card-order/card-order';
import styles from './orders-list.module.css';
import { TOrderProcessed } from '@/utils/types';
import { Link, useLocation } from 'react-router-dom';

type TOrdersList = {
	orders: TOrderProcessed[];
	personal?: boolean;
};

export const OrdersList = ({
	orders,
	personal,
}: TOrdersList): React.JSX.Element | null => {
	const location = useLocation();

	return (
		<ul className={styles.orders}>
			{orders.map((order) => (
				<li key={order._id}>
					<Link
						key={order.number}
						to={
							personal
								? `/profile/orders/${order.number}`
								: `/feed/${order.number}`
						}
						state={{ background: location }}
						className={styles.link}>
						<CardOrder order={order} personal={personal} />
					</Link>
				</li>
			))}
		</ul>
	);
};
