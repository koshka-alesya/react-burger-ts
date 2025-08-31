import { userSlice, setUser, setIsAuthChecked } from './user-slice';
import {
	login,
	logout,
	fetchUser,
	register,
	resetPassword,
	forgotPassword,
	updateUser,
} from './action';
import { IUserState, TUser } from '@/utils/types';

const reducer = userSlice.reducer;

const initialState: IUserState = {
	user: null,
	isAuthChecked: false,
	loading: false,
	error: null,
	message: null,
};

const user: TUser = { name: 'ivanov', email: 'ivanov@yandex.ru' };

describe('userSlice reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, { type: '' })).toEqual(initialState);
	});

	it('should handle setUser', () => {
		expect(reducer(initialState, setUser(user))).toEqual({
			...initialState,
			user,
		});
	});

	it('should handle setIsAuthChecked', () => {
		expect(reducer(initialState, setIsAuthChecked(true))).toEqual({
			...initialState,
			isAuthChecked: true,
		});
	});

	// LOGIN
	it('should handle login.pending', () => {
		const action = { type: login.pending.type };
		const nextState = reducer(initialState, action);

		expect(nextState).toEqual({
			...initialState,
			loading: true,
			error: null,
		});
	});

	it('should handle login.rejected', () => {
		const errorMessage = 'Login failed';
		const action = {
			type: login.rejected.type,
			error: { message: errorMessage },
		};
		const nextState = reducer(initialState, action);

		expect(nextState).toEqual({
			...initialState,
			loading: false,
			error: errorMessage,
			isAuthChecked: true,
		});
	});

	it('should handle login.fulfilled', () => {
		const action = { type: login.fulfilled.type, payload: { user } };

		expect(reducer(initialState, action)).toEqual({
			...initialState,
			loading: false,
			user,
			isAuthChecked: true,
		});
	});

	// LOGOUT
	it('should handle logout.pending', () => {
		const action = { type: logout.pending.type };
		const nextState = reducer(initialState, action);

		expect(nextState).toEqual({
			...initialState,
			loading: true,
			error: null,
		});
	});

	it('should handle logout.rejected', () => {
		const errorMessage = 'Logout failed';
		const action = {
			type: logout.rejected.type,
			error: { message: errorMessage },
		};
		const nextState = reducer(initialState, action);

		expect(nextState).toEqual({
			...initialState,
			loading: false,
			error: errorMessage,
		});
	});

	it('should handle logout.fulfilled', () => {
		const prevState: IUserState = {
			...initialState,
			user: { name: 'test', email: 'test@mail.com' },
			isAuthChecked: true,
		};
		const action = { type: logout.fulfilled.type };

		expect(reducer(prevState, action)).toEqual({
			...prevState,
			loading: false,
			user: null,
			isAuthChecked: true,
		});
	});

	// REGISTER
	it('should handle register.pending', () => {
		const action = { type: register.pending.type };
		const nextState = reducer(initialState, action);

		expect(nextState).toEqual({
			...initialState,
			loading: true,
			error: null,
		});
	});

	it('should handle register.fulfilled', () => {
		const action = { type: register.fulfilled.type, payload: { user } };
		const nextState = reducer(initialState, action);

		expect(nextState).toEqual({
			...initialState,
			loading: false,
			user,
			isAuthChecked: true,
		});
	});

	it('should handle register.rejected', () => {
		const errorMessage = 'Register failed';
		const action = {
			type: register.rejected.type,
			error: { message: errorMessage },
		};

		const nextState = reducer(initialState, action);

		expect(nextState).toEqual({
			...initialState,
			loading: false,
			error: errorMessage,
			isAuthChecked: true,
		});
	});

	// RESET PASSWORD
	it('should handle resetPassword.pending', () => {
		const action = { type: resetPassword.pending.type };
		const nextState = reducer(initialState, action);

		expect(nextState).toEqual({
			...initialState,
			loading: true,
			error: null,
		});
	});

	it('should handle resetPassword.fulfilled', () => {
		const action = {
			type: resetPassword.fulfilled.type,
			payload: { message: 'Password reset successful' },
		};
		const nextState = reducer(initialState, action);

		expect(nextState).toEqual({
			...initialState,
			loading: false,
			message: 'Password reset successful',
		});
	});

	it('should handle resetPassword.rejected', () => {
		const errorMessage = 'Reset failed';
		const action = {
			type: resetPassword.rejected.type,
			error: { message: errorMessage },
		};
		const nextState = reducer(initialState, action);

		expect(nextState).toEqual({
			...initialState,
			loading: false,
			error: errorMessage,
		});
	});

	// FORGOT PASSWORD
	it('should handle forgotPassword.pending', () => {
		const action = { type: forgotPassword.pending.type };
		const nextState = reducer(initialState, action);

		expect(nextState).toEqual({
			...initialState,
			loading: true,
			error: null,
		});
	});

	it('should handle forgotPassword.fulfilled', () => {
		const action = {
			type: forgotPassword.fulfilled.type,
			payload: { message: 'Password forgot successful' },
		};
		const nextState = reducer(initialState, action);

		expect(nextState).toEqual({
			...initialState,
			loading: false,
			message: 'Password forgot successful',
		});
	});

	it('should handle forgotPassword.rejected', () => {
		const errorMessage = 'Forgot password failed';
		const action = {
			type: forgotPassword.rejected.type,
			error: { message: errorMessage },
		};
		const nextState = reducer(initialState, action);

		expect(nextState).toEqual({
			...initialState,
			loading: false,
			error: errorMessage,
		});
	});

	// FETCH USER
	it('should handle fetchUser.pending', () => {
		const action = { type: fetchUser.pending.type };
		const nextState = reducer(initialState, action);

		expect(nextState).toEqual({
			...initialState,
			loading: true,
			error: null,
		});
	});

	it('should handle fetchUser.fulfilled', () => {
		const action = { type: fetchUser.fulfilled.type, payload: { user } };
		const nextState = reducer(initialState, action);

		expect(nextState).toEqual({
			...initialState,
			loading: false,
			user,
			isAuthChecked: true,
		});
	});

	it('should handle fetchUser.rejected', () => {
		const errorMessage = 'User fetch failed';
		const action = {
			type: fetchUser.rejected.type,
			error: { message: errorMessage },
		};
		const nextState = reducer(initialState, action);

		expect(nextState).toEqual({
			...initialState,
			loading: false,
			user: null,
			error: errorMessage,
			isAuthChecked: true,
		});
	});

	// UPDATE USER
	it('should handle updateUser.pending', () => {
		const action = { type: updateUser.pending.type };
		const nextState = reducer(initialState, action);

		expect(nextState).toEqual({
			...initialState,
			loading: true,
			error: null,
		});
	});

	it('should handle updateUser.fulfilled', () => {
		const user: TUser = { name: 'ivanov', email: 'ivanov@yandex.ru' };
		const action = { type: updateUser.fulfilled.type, payload: { user } };
		const nextState = reducer(initialState, action);

		expect(nextState).toEqual({
			...initialState,
			loading: false,
			user,
		});
	});

	it('should handle updateUser.rejected', () => {
		const errorMessage = 'Update failed';
		const action = {
			type: updateUser.rejected.type,
			error: { message: errorMessage },
		};
		const nextState = reducer(initialState, action);

		expect(nextState).toEqual({
			...initialState,
			loading: false,
			error: errorMessage,
		});
	});
});
