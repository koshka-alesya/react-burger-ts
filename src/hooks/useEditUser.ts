import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '@/services/user/action';
import { AppDispatch } from '@/services/store';
import { getUser } from '@/services/user/user-slice';

export const useEditUser = (email: string, name: string, password: string) => {
	const user = useSelector(getUser);
	const dispatch = useDispatch<AppDispatch>();

	const isChanged = useMemo(() => {
		if (!user) return false;
		return (
			(email && user.email !== email) ||
			(name && user.name !== name) ||
			password.trim() !== ''
		);
	}, [user, email, name, password]);

	const handleEditUser = useCallback(async () => {
		if (!user) return;

		if (isChanged) {
			const payload: {
				email?: string;
				name?: string;
				password?: string;
			} = {};

			if (user.email !== email && email) payload.email = email;
			if (user.name !== name && name) payload.name = name;
			if (password.trim()) payload.password = password;

			dispatch(updateUser(payload));
		}
	}, [dispatch, user, email, name, password, isChanged]);

	return { handleEditUser, isChanged };
};
