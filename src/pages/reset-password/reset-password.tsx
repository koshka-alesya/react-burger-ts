import React, { FormEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../auth/auth.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLoading } from '@/services/user/user-slice';
import { AppDispatch } from '@/services/store';
import { resetPassword } from '@/services/user/action';
import Loader from '@/components/loader/loader';

export const ResetPasswordPage = (): React.JSX.Element => {
	const [password, setPassword] = useState('');
	const [token, setToken] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const loading = useSelector(getIsLoading);

	const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const onChangeToken = (e: React.ChangeEvent<HTMLInputElement>) => {
		setToken(e.target.value);
	};

	const handleNavigateToLogin = () => {
		navigate('/login');
	};

	const handleResetPassword = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			if (!password || !token) return;
			try {
				await dispatch(resetPassword({ password, token })).unwrap();
				sessionStorage.setItem('forgotVisited', 'false');
				navigate('/login');
			} catch (error) {
				console.error('Password reset failed:', error);
			}
		},
		[dispatch, password, token, navigate]
	);

	return (
		<div className={styles.reset_password}>
			<p className='text text_type_main-medium mb-6'>Восстановление пароля</p>
			<form onSubmit={handleResetPassword}>
				<PasswordInput
					onChange={onChangePassword}
					value={password}
					placeholder='Введите новый пароль'
					name={'password'}
					extraClass='mb-6'
					autoComplete='current-password'
				/>
				<Input
					type={'text'}
					placeholder={'Введите код из письма'}
					onChange={onChangeToken}
					value={token}
					name={'code'}
					error={false}
					size={'default'}
					extraClass='mb-6'
				/>
				<Button
					htmlType='submit'
					type='primary'
					size='large'
					extraClass='mb-20'>
					Сохранить
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
