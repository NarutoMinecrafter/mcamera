import {combineReducers} from '@reduxjs/toolkit';

import {AppDispatch} from '../store';
import usersReducer from '../services/user';
import devicesReducer from '../services/devices/devicesSliceAdapter';
import photosReducer from '../services/photos/photosSliceAdapter';
import serverReducer from '../services/server/serverSlice';
import userGroupsReducer from '../services/userGroups';


const rootReducer = combineReducers({
    users: usersReducer,
    devices: devicesReducer,
    server: serverReducer,
    photos: photosReducer,
    userGroups: userGroupsReducer
});

export type RootState = ReturnType<typeof rootReducer>

declare module 'react-redux' {

    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface DefaultRootState extends RootState {
    }

    export function useDispatch<TDispatch = AppDispatch>(): AppDispatch;
}

export default rootReducer;
