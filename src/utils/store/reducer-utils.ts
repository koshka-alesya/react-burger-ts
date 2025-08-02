import { getErrorMessageFromAction } from './parse-error';

interface LoadingErrorState {
	loading: boolean;
	error: string | null;
}

export const handlePending = <T extends LoadingErrorState>(state: T) => {
	state.loading = true;
	state.error = null;
};

export const handleRejected = <T extends LoadingErrorState, A>(
	state: T,
	action: A
) => {
	state.loading = false;
	state.error = getErrorMessageFromAction(action);
};
