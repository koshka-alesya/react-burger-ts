import React, { FormEvent, useCallback, useState } from 'react';
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

export const ForgotPasswordPage = (): React.JSX.Element => {
	const [email, setEmail] = useState<string>('');
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const loading = useSelector(getIsLoading);

	const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handleNavigateToLogin = () => {
		navigate('/login');
	};

	const handleForgotPassword = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			if (!email) return;
			try {
				await dispatch(forgotPassword({ email })).unwrap();
				sessionStorage.setItem('forgotVisited', 'true');
				navigate('/reset-password');
			} catch (error) {
				console.error('Password reset failed:', error);
			}
		},
		[dispatch, email, navigate]
	);

	return (
		<div className={styles.forgot_password}>
			<p className='text text_type_main-medium mb-6'>Восстановление пароля</p>
			<form onSubmit={handleForgotPassword}>
				<EmailInput
					onChange={onChangeEmail}
					value={email}
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
