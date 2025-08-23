import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	login,
	logout,
	fetchUser,
	updateUser,
	register,
	resetPassword,
	forgotPassword,
} from './action';
import { TUser, IUserState } from '@/utils/types';
import { handlePending, handleRejected } from '@/utils/store/reducer-utils';

const initialState: IUserState = {
	user: null,
	isAuthChecked: false,
	loading: false,
	error: null,
	message: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<TUser | null>) => {
			state.user = action.payload;
		},
		setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
			state.isAuthChecked = action.payload;
		},
	},
	selectors: {
		getUser: (state) => state.user,
		getIsAuthChecked: (state) => state.isAuthChecked,
		getIsLoading: (state) => state.loading,
		getUserState: (state) => state,
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, handlePending)
			.addCase(login.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user;
				state.isAuthChecked = true;
			})
			.addCase(login.rejected, (state, action) => {
				handleRejected(state, action);
				state.isAuthChecked = true;
			})
			.addCase(register.pending, handlePending)
			.addCase(register.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user;
				state.isAuthChecked = true;
			})
			.addCase(register.rejected, (state, action) => {
				handleRejected(state, action);
				state.isAuthChecked = true;
			})

			.addCase(logout.pending, handlePending)
			.addCase(logout.fulfilled, (state) => {
				state.loading = false;
				state.user = null;
				state.isAuthChecked = true;
			})
			.addCase(logout.rejected, handleRejected)

			.addCase(resetPassword.pending, handlePending)
			.addCase(resetPassword.fulfilled, (state, action) => {
				state.loading = false;
				state.message = action.payload.message;
			})
			.addCase(resetPassword.rejected, handleRejected)

			.addCase(forgotPassword.pending, handlePending)
			.addCase(forgotPassword.fulfilled, (state, action) => {
				state.loading = false;
				state.message = action.payload.message;
			})
			.addCase(forgotPassword.rejected, handleRejected)

			.addCase(fetchUser.pending, handlePending)
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user;
				state.isAuthChecked = true;
			})
			.addCase(fetchUser.rejected, (state, action) => {
				handleRejected(state, action);
				state.user = null;
				state.isAuthChecked = true;
			})
			.addCase(updateUser.pending, handlePending)
			.addCase(updateUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user;
			})
			.addCase(updateUser.rejected, handleRejected);
	},
});

export const { getUser, getIsAuthChecked, getIsLoading, getUserState } =
	userSlice.selectors;
export const { setUser, setIsAuthChecked } = userSlice.actions;
