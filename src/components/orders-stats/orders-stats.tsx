import React, { useMemo } from 'react';
import styles from './orders-stats.module.css';
import {
	getAllOrdersState,
	getDoneOrders,
	getPendingOrders,
} from '@/services/all-orders/all-orders-slice';
import { ConnectionStatus } from '@/utils/types';
import Loader from '../loader/loader';
import { useAppSelector } from '@/hooks/hooks';

const MAX_ITEMS_PER_COLUMN = 10;

export const OrdersStats = (): React.JSX.Element => {
	const { status, total, totalToday } = useAppSelector(getAllOrdersState);

	const doneOrders = useAppSelector(getDoneOrders);
	const pendingOrders = useAppSelector(getPendingOrders);

	const doneOrdersColumn1 = useMemo(
		() => doneOrders.slice(0, MAX_ITEMS_PER_COLUMN),
		[doneOrders]
	);
	const doneOrdersColumn2 = useMemo(
		() => doneOrders.slice(MAX_ITEMS_PER_COLUMN, 2 * MAX_ITEMS_PER_COLUMN),
		[doneOrders]
	);

	const pendingOrdersColumn1 = useMemo(
		() => pendingOrders.slice(0, MAX_ITEMS_PER_COLUMN),
		[pendingOrders]
	);
	const pendingOrdersColumn2 = useMemo(
		() => pendingOrders.slice(MAX_ITEMS_PER_COLUMN, 2 * MAX_ITEMS_PER_COLUMN),
		[pendingOrders]
	);

	return (
		<div className={styles.orders_stats}>
			{status !== ConnectionStatus.ONLINE && <Loader />}
			<div className={`${styles.orders_board} mb-15`}>
				<div className={styles.done}>
					<p className='text text_type_main-medium mb-6'>Готовы:</p>
					<div className={styles.container}>
						<ul className={styles.list}>
							{doneOrdersColumn1.map((number) => (
								<li key={number}>
									<p className='text text_type_digits-default '>{number}</p>
								</li>
							))}
						</ul>
						<ul className={styles.list}>
							{doneOrdersColumn2.map((number) => (
								<li key={number}>
									<p className='text text_type_digits-default '>{number}</p>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div>
					<p className='text text_type_main-medium mb-6'>В работе:</p>
					<div className={styles.container}>
						<ul className={styles.list}>
							{pendingOrdersColumn1.map((number) => (
								<li key={number}>
									<p className='text text_type_digits-default '>{number}</p>
								</li>
							))}
						</ul>
						<ul className={styles.list}>
							{pendingOrdersColumn2.map((number) => (
								<li key={number}>
									<p className='text text_type_digits-default '>{number}</p>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
			<div className='mb-15'>
				<p className='text text_type_main-medium'>Выполнено за все время:</p>
				<p className={`${styles.count} text text_type_digits-large`}>{total}</p>
			</div>
			<div>
				<p className='text text_type_main-medium'>Выполнено за сегодня:</p>
				<p className={`${styles.count} text text_type_digits-large`}>
					{totalToday}
				</p>
			</div>
		</div>
	);
};
