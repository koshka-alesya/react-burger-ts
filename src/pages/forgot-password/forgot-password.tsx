import React, { FormEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Button,
	EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../auth/auth.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '@/services/user/action';
import { AppDispatch } from '@/services/store';
import { getIsLoading } from '@/services/user/user-slice';
import Loader from '@/components/loader/loader';
import { useForm } from '@/hooks/useForm';

export const ForgotPasswordPage = (): React.JSX.Element => {
	const { values, handleChange } = useForm({
		email: '',
	});
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const loading = useSelector(getIsLoading);

	const handleNavigateToLogin = () => {
		navigate('/login');
	};

	const handleForgotPassword = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			if (!values.email) return;
			try {
				await dispatch(forgotPassword({ email: values.email })).unwrap();
				sessionStorage.setItem('forgotVisited', 'true');
				navigate('/reset-password');
			} catch (error) {
				console.error('Password reset failed:', error);
			}
		},
		[dispatch, values.email, navigate]
	);

	return (
		<div className={styles.forgot_password}>
			<p className='text text_type_main-medium mb-6'>Восстановление пароля</p>
			<form onSubmit={handleForgotPassword}>
				<EmailInput
					onChange={handleChange}
					value={values.email}
					name={'email'}
					isIcon={false}
					extraClass='mb-6'
				/>
				<Button
					htmlType='submit'
					type='primary'
					size='large'
					extraClass='mb-20'>
					Восстановить
				</Button>
			</form>
			<div className={styles.additional_action}>
				<p className='text text_type_main-default text_color_inactive mr-2'>
					Вспомнили пароль?
				</p>
				<Button
					htmlType='button'
					type='secondary'
					size='medium'
					extraClass={styles.button}
					onClick={handleNavigateToLogin}>
					Войти
				</Button>
			</div>
			{loading && <Loader />}
		</div>
	);
};
