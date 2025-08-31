import React, { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getIsAuthChecked, getUser } from '../../services/user/user-slice';
import Loader from '../loader/loader';
import { useAppSelector } from '@/hooks/hooks';

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
	const isAuthChecked = useAppSelector(getIsAuthChecked);
	const user = useAppSelector(getUser);
	const location = useLocation();
	const isUser = Boolean(user);

	const forgotVisited = sessionStorage.getItem('forgotVisited') === 'true';

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
