import React, {
	ChangeEvent,
	FormEvent,
	useEffect,
	useRef,
	useState,
} from 'react';
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

export const ProfileInfo = (): React.JSX.Element | null => {
	const { user, loading } = useSelector(getUserState);
	const [email, setEmail] = useState(user?.email || '');
	const [name, setName] = useState(user?.name || '');
	const [password, setPassword] = useState('');
	const [nameDisabled, setNameDisabled] = useState<boolean>(true);
	const [shouldFocus, setShouldFocus] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const { handleEditUser, isChanged } = useEditUser(email, name, password);

	const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleCancel = () => {
		setEmail(user?.email || '');
		setName(user?.name || '');
		setPassword('');
	};

	const handleIconClick = () => {
		setNameDisabled(false);
		setShouldFocus(true);
	};

	useEffect(() => {
		if (!nameDisabled && shouldFocus && inputRef.current) {
			inputRef.current.focus();
			setShouldFocus(false);
		}
	}, [nameDisabled, shouldFocus]);

	const onBlur = () => {
		setNameDisabled(true);
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
				onChange={(e) => setName(e.target.value)}
				value={name}
				name={'name'}
				size={'default'}
				icon={'EditIcon'}
				extraClass='mb-6'
				disabled={nameDisabled}
				onIconClick={handleIconClick}
				onBlur={onBlur}
			/>
			<EmailInput
				onChange={onChangeEmail}
				value={email}
				name={'email'}
				isIcon={true}
				extraClass='mb-6'
			/>
			<PasswordInput
				onChange={onChangePassword}
				value={password}
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
