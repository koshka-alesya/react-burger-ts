import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Button,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../auth/auth.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/services/user/action';
import { AppDispatch } from '@/services/store';
import { getIsLoading } from '@/services/user/user-slice';
import Loader from '@/components/loader/loader';

export const LoginPage = (): React.JSX.Element => {
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const loading = useSelector(getIsLoading);

	const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleNavigateToRegister = () => {
		navigate('/register');
	};

	const handleNavigateToForgotPassword = () => {
		navigate('/forgot-password');
	};

	const handleLogin = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			if (!email || !password) return;
			const payload = { email, password };
			try {
				await dispatch(login(payload)).unwrap();
			} catch (error) {
				console.error('Login failed:', error);
			}
		},
		[dispatch, email, password]
	);

	return (
		<div className={styles.login}>
			<p className='text text_type_main-medium mb-6'>Вход</p>
			<form onSubmit={handleLogin}>
				<EmailInput
					onChange={onChangeEmail}
					value={email}
					name={'email'}
					isIcon={false}
					extraClass='mb-6'
					autoComplete='off'
				/>
				<PasswordInput
					onChange={onChangePassword}
					value={password}
					name={'password'}
					autoComplete='current-password'
					extraClass='mb-6'
				/>
				<Button
					htmlType='submit'
					type='primary'
					size='large'
					extraClass='mb-20'>
					Войти
				</Button>
			</form>
			<div className={`${styles.additional_action} mb-4`}>
				<p className='text text_type_main-default text_color_inactive mr-2'>
					Вы — новый пользователь?
				</p>
				<Button
					htmlType='button'
					type='secondary'
					size='medium'
					extraClass={styles.button}
					onClick={handleNavigateToRegister}>
					Зарегистрироваться
				</Button>
			</div>
			<div className={styles.additional_action}>
				<p className='text text_type_main-default text_color_inactive mr-2'>
					Забыли пароль?
				</p>
				<Button
					htmlType='button'
					type='secondary'
					size='medium'
					extraClass={styles.button}
					onClick={handleNavigateToForgotPassword}>
					Восстановить пароль
				</Button>
			</div>
			{loading && <Loader />}
		</div>
	);
};
