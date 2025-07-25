import React, { FormEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../auth/auth.module.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/services/store';
import { register } from '@/services/user/action';

export const RegistrationPage = (): React.JSX.Element => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleNavigateToLogin = () => {
		navigate('/login');
	};

	const handleRegister = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			try {
				e.preventDefault();
				await dispatch(register({ email, password, name })).unwrap();
				navigate('/');
			} catch (err) {
				console.error('Registration failed:', err);
			}
		},
		[dispatch, email, password, name, navigate]
	);

	return (
		<div className={styles.registration}>
			<p className='text text_type_main-medium mb-6'>Регистрация</p>
			<form onSubmit={handleRegister}>
				<Input
					type={'text'}
					placeholder={'Имя'}
					onChange={(e) => setName(e.target.value)}
					value={name}
					name={'name'}
					error={false}
					size={'default'}
					extraClass='mb-6'
				/>
				<EmailInput
					onChange={onChangeEmail}
					value={email}
					name={'email'}
					isIcon={false}
					extraClass='mb-6'
				/>
				<PasswordInput
					onChange={onChangePassword}
					value={password}
					name={'password'}
					extraClass='mb-6'
					autoComplete='current-password'
				/>
				<Button
					htmlType='submit'
					type='primary'
					size='large'
					extraClass='mb-20'>
					Зарегистрироваться
				</Button>
			</form>
			<div className={styles.additional_action}>
				<p className='text text_type_main-default text_color_inactive mr-2'>
					Уже зарегистрированы?
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
		</div>
	);
};
