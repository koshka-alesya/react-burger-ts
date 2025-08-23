import { IActionWithError } from '../types';
import { getErrorMessageFromAction } from './parse-error';

interface ILoadingErrorState {
	loading: boolean;
	error: string | null;
}

export const handlePending = <T extends ILoadingErrorState>(state: T) => {
	state.loading = true;
	state.error = null;
};

export const handleRejected = <T extends ILoadingErrorState>(
	state: T,
	action: IActionWithError
) => {
	state.loading = false;
	state.error = getErrorMessageFromAction(action);
};
