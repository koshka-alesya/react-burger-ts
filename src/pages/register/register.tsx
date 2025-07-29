import React, { FormEvent, useCallback } from 'react';
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
import { useForm } from '@/hooks/useForm';

export const RegistrationPage = (): React.JSX.Element => {
	const { values, handleChange } = useForm({
		email: '',
		name: '',
		password: '',
	});
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const handleNavigateToLogin = () => {
		navigate('/login');
	};

	const handleRegister = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			if (!values.email || !values.password || !values.name) {
				return;
			}
			try {
				e.preventDefault();
				await dispatch(
					register({
						email: values.email,
						password: values.password,
						name: values.name,
					})
				).unwrap();
				navigate('/');
			} catch (err) {
				console.error('Registration failed:', err);
			}
		},
		[dispatch, values.email, values.password, values.name, navigate]
	);

	return (
		<div className={styles.registration}>
			<p className='text text_type_main-medium mb-6'>Регистрация</p>
			<form onSubmit={handleRegister}>
				<Input
					type={'text'}
					placeholder={'Имя'}
					onChange={handleChange}
					value={values.name}
					name={'name'}
					error={false}
					size={'default'}
					extraClass='mb-6'
				/>
				<EmailInput
					onChange={handleChange}
					value={values.email}
					name={'email'}
					isIcon={false}
					extraClass='mb-6'
				/>
				<PasswordInput
					onChange={handleChange}
					value={values.password}
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
