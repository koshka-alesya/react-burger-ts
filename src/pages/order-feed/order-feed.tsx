import React, { useEffect } from 'react';
import styles from './order-feed.module.css';
import { OrdersStats } from '@/components/orders-stats/orders-stats';
import { ReduxStore } from '@/services/rootReducer';
import {
	getAllProcessedOrders,
	getConnectionStatus,
} from '@/services/all-orders/all-orders-slice';
import { ActionCreator } from '@/services/all-orders/actions';
import { connect } from 'react-redux';
import { ConnectionStatus, TOrderProcessed } from '@/utils/types';
import Loader from '@/components/loader/loader';
import { OrdersList } from '@/components/orders-list/orders-list';
import { AppDispatch } from '@/services/store';

interface IStateProps {
	data: TOrderProcessed[];
	connectionStatus: ConnectionStatus;
}

interface IActionProps {
	connect: () => void;
	disconnect: () => void;
}

const OrderFeed = ({
	connectionStatus,
	connect,
	disconnect,
	data,
}: IActionProps & IStateProps): React.JSX.Element => {
	useEffect(() => {
		connect();
		return () => {
			disconnect();
		};
	}, []);

	return (
		<div className={styles.order_feed}>
			{connectionStatus !== ConnectionStatus.ONLINE && <Loader />}
			{connectionStatus === ConnectionStatus.ONLINE && (
				<>
					<h1 className={`${styles.title} text text_type_main-large mt-5 mb-5`}>
						Лента заказов
					</h1>
					<main className={`${styles.main}`}>
						<OrdersList orders={data} />
						<OrdersStats />
					</main>
				</>
			)}
		</div>
	);
};

const mapStateToProps = (state: ReduxStore): IStateProps => ({
	data: getAllProcessedOrders(state),
	connectionStatus: getConnectionStatus(state),
});

const mapDispatchToProps = (dispatch: AppDispatch): IActionProps => ({
	connect: () => dispatch(ActionCreator.connect()),
	disconnect: () => dispatch(ActionCreator.disconnect()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderFeed);
