import {AppDispatch} from '../store';
import {ResponseContext} from 'openapi/src';
import {resetToken} from 'helpers/auth';
import {usersSlice} from './user/userSliceAdapter';

export const postMiddleware = (dispatch: AppDispatch) => async (context: ResponseContext): Promise<void> => {
    if (context.response.status === 401) {
        resetToken();
        dispatch(usersSlice.actions.setCurrentUser(null));
    }
};
