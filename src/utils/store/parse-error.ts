import { IActionWithError } from '../types';

export const getErrorMessageFromAction = (action: IActionWithError): string => {
	if (typeof action.payload === 'string') {
		return action.payload;
	}

	if (action.error?.message) {
		return action.error.message;
	}

	return 'Unknown error';
};
