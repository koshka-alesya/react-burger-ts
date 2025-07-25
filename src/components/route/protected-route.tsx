import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import {
	getIsAuthChecked,
	setIsAuthChecked,
	getUser,
} from '../../services/user/user-slice';
import Loader from '../loader/loader';
import { AppDispatch } from '@/services/store';
import { fetchUser } from '@/services/user/action';

interface ProtectedRouteProps {
	onlyUnAuth?: boolean;
	component: ReactElement;
	requireForgotFlow?: boolean;
}

export const ProtectedRouteElement: React.FC<ProtectedRouteProps> = ({
	onlyUnAuth = false,
	component,
	requireForgotFlow = false,
}) => {
	const isAuthChecked = useSelector(getIsAuthChecked);
	const user = useSelector(getUser);
	const location = useLocation();
	const dispatch = useDispatch<AppDispatch>();
	const isUser = Boolean(user);

	const forgotVisited = sessionStorage.getItem('forgotVisited') === 'true';

	useEffect(() => {
		if (!isAuthChecked) {
			dispatch(fetchUser()).finally(() => {
				dispatch(setIsAuthChecked(true));
			});
		}
	}, [dispatch, isAuthChecked]);

	if (!isAuthChecked) {
		return <Loader />;
	}

	if (!onlyUnAuth && !isUser) {
		return <Navigate to='/login' state={{ from: location }} replace />;
	}

	if (onlyUnAuth && isUser) {
		const from = (location.state as { from?: Location })?.from?.pathname || '/';
		return <Navigate to={from} replace />;
	}

	if (requireForgotFlow && !forgotVisited) {
		return <Navigate to='/forgot-password' replace />;
	}

	return component;
};

export default ProtectedRouteElement;
