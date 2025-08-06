import { PayloadAction } from '@reduxjs/toolkit';

export interface IActionWithError<T = unknown> extends PayloadAction<T> {
	error?: { message?: string };
}

export type TIngredient = {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_large: string;
	image_mobile: string;
	__v: number;
	uuid?: string;
};

export type TUser = {
	email: string;
	name: string;
};

export interface IBasicResponse {
	success: false;
	message?: string;
}

export interface ILoginRequest {
	email: string;
	password: string;
}

export interface IRegisterRequest extends ILoginRequest {
	name: string;
}

export interface ITokenRequest {
	token: string;
}
export interface IForgotPasswordRequest {
	email: string;
}

export interface IResetPasswordRequest {
	password: string;
	token: string;
}

export interface IUpdateUserRequest {
	name?: string;
	email?: string;
	password?: string;
}

interface IAuthTokens {
	accessToken: string;
	refreshToken: string;
}

interface IWithUser {
	user: TUser;
}

export interface LoginResponse extends IBasicResponse, IAuthTokens, IWithUser {}
export interface RegisterResponse
	extends IBasicResponse,
		IAuthTokens,
		IWithUser {}
export interface RefreshTokenResponse extends IBasicResponse, IAuthTokens {}
export interface UserResponse extends IBasicResponse, IWithUser {}

export interface IUserState {
	user: TUser | null;
	isAuthChecked: boolean;
	loading: boolean;
	error: string | null;
	message?: string | null;
}
