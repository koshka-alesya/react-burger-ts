import React, { useEffect } from 'react';
import styles from './app.module.css';
import { AppHeader } from '@/components/app-header/app-header';
import {
	Routes,
	Route,
	useLocation,
	useNavigate,
	useNavigationType,
} from 'react-router-dom';
import { HomePage } from '@/pages/home/home';
import ProtectedRouteElement from '../route/protected-route';
import { LoginPage } from '@/pages/login/login';
import { RegistrationPage } from '@/pages/register/register';
import { ForgotPasswordPage } from '@/pages/forgot-password/forgot-password';
import { ResetPasswordPage } from '@/pages/reset-password/reset-password';
import { ProfilePage } from '@/pages/profile/profile';
import { ErrorPage } from '@/pages/error/error';
import { ProfileInfo } from '../profile-info/profile-info';
import { OrderHistory } from '../order-history/order-history';
import { ProfileOrderDetails } from '../profile-order-details/profile-order-details';
import { Modal } from '../modal/modal';
import { IngredientDetailsPage } from '@/pages/ingredient-details/ingredient-details';
import { IngredientDetailsModal } from '../ingredient-details/ingredient-details-modal';
import { AppDispatch } from '@/services/store';
import { useDispatch, useSelector } from 'react-redux';
import { loadIngredients } from '@/services/ingredients/actions';
import { getIngredientsState } from '@/services/ingredients/ingredients-slice';
import Loader from '../loader/loader';

export const App = (): React.JSX.Element | null => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch<AppDispatch>();
	const navigationType = useNavigationType();
	const { error, loading } = useSelector(getIngredientsState);
	const background = location.state && location.state.background;
	const isModal = background && navigationType === 'PUSH';

	useEffect(() => {
		dispatch(loadIngredients());
	}, []);

	const handleModalClose = () => {
		navigate(-1);
	};

	if (error) {
		return null;
	}

	if (loading) {
		return <Loader />;
	}

	return (
		<div className={styles.app}>
			<AppHeader />
			<main className={styles.main}>
				<Routes location={isModal ? background : location}>
					<Route path='/' element={<HomePage />} />
					<Route
						path='/login'
						element={
							<ProtectedRouteElement onlyUnAuth component={<LoginPage />} />
						}
					/>
					<Route
						path='/register'
						element={
							<ProtectedRouteElement
								onlyUnAuth
								component={<RegistrationPage />}
							/>
						}
					/>
					<Route
						path='/forgot-password'
						element={
							<ProtectedRouteElement
								onlyUnAuth
								component={<ForgotPasswordPage />}
							/>
						}
					/>
					<Route
						path='/reset-password'
						element={
							<ProtectedRouteElement
								onlyUnAuth
								requireForgotFlow
								component={<ResetPasswordPage />}
							/>
						}
					/>
					<Route
						path='/profile'
						element={<ProtectedRouteElement component={<ProfilePage />} />}>
						<Route index element={<ProfileInfo />} />
						<Route path='orders' element={<OrderHistory />} />
						<Route path='orders/:number' element={<ProfileOrderDetails />} />
					</Route>
					<Route path='/ingredients/:id' element={<IngredientDetailsPage />} />
					<Route path='/error' element={<ErrorPage />} />
					<Route path='*' element={<ErrorPage />} />
				</Routes>

				{isModal && (
					<Routes>
						<Route
							path='/ingredients/:id'
							element={
								<Modal header='Детали ингредиента' onClose={handleModalClose}>
									<IngredientDetailsModal />
								</Modal>
							}
						/>
					</Routes>
				)}
			</main>
		</div>
	);
};

export default App;
