import { PayloadAction } from '@reduxjs/toolkit';

interface ActionWithError<T = unknown> extends PayloadAction<T> {
	error?: { message?: string };
}

export const getErrorMessageFromAction = (action: ActionWithError): string => {
	if (typeof action.payload === 'string') {
		return action.payload;
	}

	if (action.error?.message) {
		return action.error.message;
	}

	return 'Unknown error';
};
