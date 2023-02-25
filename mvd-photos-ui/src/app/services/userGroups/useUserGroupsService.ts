import {
    Configuration,
    UserGroupApi
} from 'openapi/src';
import {getToken} from 'helpers/auth';
import {toast} from 'react-toastify';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {postMiddleware} from '../postMiddleware';
import {getBasePath} from '../basePath';
import {userGroupsSlice} from './userGroupsSliceAdapter';


export const userGroupApi = new UserGroupApi(new Configuration({
    accessToken: getToken,
    basePath: getBasePath()
}));

export const useUserGroupsService = () => {

    const dispatch = useDispatch();

    const getUserGroups = useCallback(() => {
        const getUsers = async () => {
            try {
                const userGroups = await userGroupApi
                    .withPostMiddleware(postMiddleware(dispatch))
                    .userGroupsControllerGetUserGroups();
                dispatch(userGroupsSlice.actions.usersGroupsReceived(userGroups));
            } catch (e) {
                toast.error(e.statusText);
            }
        };
        return getUsers();
    }, []);

    const removeUserGroup = useCallback((userGroupId: number) => {
        const removeUsersGr = async () => {
            try {
                await userGroupApi
                    .withPostMiddleware(postMiddleware(dispatch))
                    .userGroupsControllerDeleteUserGroup({userGroupId});
                dispatch(userGroupsSlice.actions.removeUserGroup(userGroupId));
            } catch (e) {
                toast.error(e.statusText);
            }
        };
        return removeUsersGr();
    }, []);


    return {
        getUserGroups,
        removeUserGroup
    };
};
