import React, { useEffect } from 'react';
import styles from './order-history.module.css';
import { ReduxStore } from '@/services/rootReducer';
import {
	getUserProcessedOrders,
	getConnectionStatus,
} from '@/services/user-orders/user-orders-slice';
import { ActionCreator } from '@/services/user-orders/actions';
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

const OrderHistory = ({
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
		<div className={`${styles.order_history} pt-10 pb-10`}>
			{connectionStatus !== ConnectionStatus.ONLINE && <Loader />}
			{connectionStatus === ConnectionStatus.ONLINE && (
				<OrdersList orders={data} personal />
			)}
		</div>
	);
};

const mapStateToProps = (state: ReduxStore): IStateProps => ({
	data: getUserProcessedOrders(state),
	connectionStatus: getConnectionStatus(state),
});

const mapDispatchToProps = (dispatch: AppDispatch): IActionProps => ({
	connect: () => dispatch(ActionCreator.connect()),
	disconnect: () => dispatch(ActionCreator.disconnect()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
