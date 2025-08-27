import { all } from 'redux-saga/effects';
import { allOrdersConnect } from './order-feed/all-orders';
import { userOrdersConnect } from './order-feed/user-orders';

export default function* rootSaga() {
	yield all([allOrdersConnect(), userOrdersConnect()]);
}
