import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './profile.module.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/services/store';
import { useCallback } from 'react';
import { logout } from '@/services/user/action';

export const ProfilePage = (): React.JSX.Element => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const handleLogout = useCallback(
		async (e: React.MouseEvent) => {
			e.preventDefault();
			try {
				await dispatch(logout()).unwrap();
				navigate('/');
			} catch (err) {
				console.error('Logout failed', err);
			}
		},
		[dispatch, navigate]
	);

	return (
		<div className={styles.profile}>
			<nav className={styles.nav}>
				<NavLink
					to='/profile'
					end
					className={({ isActive }) =>
						`${styles.item} text text_type_main-medium ${!isActive ? styles.inactive : ''}`
					}>
					Профиль
				</NavLink>
				<NavLink
					to='/profile/orders'
					className={({ isActive }) =>
						` ${styles.item} text text_type_main-medium ${!isActive ? styles.inactive : ''}`
					}>
					История заказов
				</NavLink>
				<NavLink
					to='/logout'
					className={({ isActive }) =>
						` ${styles.item} text text_type_main-medium ${!isActive ? styles.inactive : ''}	`
					}
					onClick={handleLogout}>
					Выход
				</NavLink>
				<p className='text text_type_main-default text_color_inactive mt-20'>
					В этом разделе вы можете изменить свои персональные данные
				</p>
			</nav>
			<div className={styles.content}>
				<Outlet />
			</div>
		</div>
	);
};
