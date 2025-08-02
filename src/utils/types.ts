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

interface BasicResponse {
	success: boolean;
	message: string;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	success: boolean;
	accessToken: string;
	refreshToken: string;
	user: {
		email: string;
		name: string;
	};
}

export interface LogoutRequest {
	token: string;
}

export interface LogoutResponse extends BasicResponse {}

export interface RegisterRequest {
	email: string;
	password: string;
	name: string;
}

export interface RegisterResponse {
	success: boolean;
	user: {
		email: string;
		name: string;
	};
	accessToken: string;
	refreshToken: string;
}

export interface RefreshTokenRequest {
	token: string;
}

export interface RefreshTokenResponse {
	success: boolean;
	accessToken: string;
	refreshToken: string;
}

export interface User {
	email: string;
	name: string;
}

export interface UserResponse {
	success: boolean;
	user: User;
}

export interface UpdateUserRequest {
	name?: string;
	email?: string;
	password?: string;
}

export interface UserState {
	user: User | null;
	isAuthChecked: boolean;
	loading: boolean;
	error: string | null;
	message?: string | null;
}

export interface ForgotPasswordRequest {
	email: string;
}

export interface ForgotPasswordResponse extends BasicResponse {}

export interface ResetPasswordRequest {
	password: string;
	token: string;
}

export interface ResetPasswordResponse extends BasicResponse {}
