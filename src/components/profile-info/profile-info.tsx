import React, { FormEvent, useEffect, useRef } from 'react';
import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { getUserState } from '@/services/user/user-slice';
import { useEditUser } from '@/hooks/useEditUser';
import { useSelector } from 'react-redux';
import Loader from '../loader/loader';
import { useForm } from '@/hooks/useForm';

export const ProfileInfo = (): React.JSX.Element | null => {
	const { user, loading } = useSelector(getUserState);
	const { values, handleChange, setValues } = useForm({
		email: user?.email || '',
		name: user?.name || '',
		password: '',
		nameDisabled: true,
		shouldFocus: false,
	});

	const inputRef = useRef<HTMLInputElement>(null);

	const { handleEditUser, isChanged } = useEditUser(
		values.email,
		values.name,
		values.password
	);

	const handleCancel = () => {
		setValues({
			...values,
			email: user?.email || '',
			name: user?.name || '',
			password: '',
		});
	};

	const handleIconClick = () => {
		setValues({
			...values,
			nameDisabled: false,
			shouldFocus: true,
		});
	};

	useEffect(() => {
		if (!values.nameDisabled && values.shouldFocus && inputRef.current) {
			inputRef.current.focus();
			setValues({
				...values,
				shouldFocus: false,
			});
		}
	}, [values.nameDisabled, values.shouldFocus]);

	const onBlur = () => {
		setValues({ ...values, nameDisabled: true });
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleEditUser();
	};

	if (!user) {
		return null;
	}

	return (
		<form onSubmit={handleSubmit}>
			<Input
				type={'text'}
				ref={inputRef}
				placeholder={'Имя'}
				onChange={handleChange}
				value={values.name}
				name={'name'}
				size={'default'}
				icon={'EditIcon'}
				extraClass='mb-6'
				disabled={values.nameDisabled}
				onIconClick={handleIconClick}
				onBlur={onBlur}
			/>
			<EmailInput
				onChange={handleChange}
				value={values.email}
				name={'email'}
				isIcon={true}
				extraClass='mb-6'
			/>
			<PasswordInput
				onChange={handleChange}
				value={values.password}
				name={'password'}
				icon={'EditIcon'}
				autoComplete='current-password'
				extraClass='mb-6'
			/>
			{isChanged && (
				<div>
					<Button
						htmlType='button'
						type='secondary'
						size='medium'
						onClick={handleCancel}>
						Отмена
					</Button>
					<Button
						htmlType='submit'
						type='primary'
						size='medium'
						extraClass='mb-20'
						onClick={handleEditUser}>
						Сохранить
					</Button>
				</div>
			)}
			{loading && <Loader />}
		</form>
	);
};
