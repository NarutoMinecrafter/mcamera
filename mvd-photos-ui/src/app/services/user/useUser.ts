import {getToken, resetToken} from 'helpers/auth';
import jwt_decode from 'jwt-decode';
import {User} from 'openapi/src';
import {useDispatch, useSelector} from 'react-redux';
import {usersSlice} from './userSliceAdapter';
import {useCallback} from 'react';
import {photosSlice} from '../photos/photosSliceAdapter';
import {devicesSlice} from '../devices/devicesSliceAdapter';

const useUser = () => {

    const dispatch = useDispatch();
    const logout = useCallback(() => {
        resetToken();
        dispatch(usersSlice.actions.setCurrentUser(null));
        dispatch(photosSlice.actions.photosRemove());
        dispatch(devicesSlice.actions.removeAllDevices());
    }, []);

    let user = useSelector(state => state.users.currentUser);

    if (!user) {
        const userToken = getToken();
        const userFromToken = userToken ? jwt_decode<User>(userToken) : null;
        dispatch(usersSlice.actions.setCurrentUser(userFromToken));
        user = userFromToken;
    }

    return {
        isLogged: Boolean(user),
        user,
        logout
    };
};

export {
    useUser
};
