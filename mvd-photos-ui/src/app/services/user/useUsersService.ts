import {AuthCredentialsDto, Configuration, CreatePermissionDto, PermissionsApi, UsersAdminApi} from 'openapi/src';
import {getToken} from 'helpers/auth';
import {toast} from 'react-toastify';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {postMiddleware} from '../postMiddleware';
import {usersSlice} from './userSliceAdapter';
import {getBasePath} from '../basePath';
import {userGroupsSlice} from '../userGroups';


const devicesApi = new UsersAdminApi(new Configuration({
    accessToken: getToken,
    basePath: getBasePath()
}));

const permissionsApi = new PermissionsApi(new Configuration({
    accessToken: getToken,
    basePath: getBasePath()
}));


export const useUsersService = () => {

    const dispatch = useDispatch();

    const getUsersWithDevices = useCallback(() => {
        const getUsers = async () => {
            try {
                const users = await devicesApi
                    .withPostMiddleware(postMiddleware(dispatch))
                    .usersControllerGetUsersWithDevices();
                dispatch(usersSlice.actions.usersReceived(users));
            } catch (e) {
                toast.error(e.statusText);
            }
        };
        return getUsers();
    }, []);

    const getUsersPermissions = useCallback(() => {
        const getUsersPermissions = async () => {
            try {
                const perms = await permissionsApi
                    .withPostMiddleware(postMiddleware(dispatch))
                    .permissionsControllerGetUserPermissions();
                const {userId, user, id, ...rest} = perms;
                dispatch(usersSlice.actions.setCurrentUserPermissions(rest));
                return rest;
            } catch (e) {
                toast.error(e.statusText || 'Error Get Permissions');
                return undefined;
            }
        };
        return getUsersPermissions();
    }, []);

    const removeUserAdmin = useCallback((userId: number) => {
        const removeUser = async () => {
            try {
                await devicesApi
                    .withPostMiddleware(postMiddleware(dispatch))
                    .usersControllerRemoveUser({userId});
                dispatch(usersSlice.actions.removeUser(userId));
                dispatch(userGroupsSlice.actions.removeUser({userId}));
                toast.success('Користувач успішно видалений.');
            } catch (e) {
                const res = await e.json();
                toast.error(res.error);
                // throw res.error;
            }
        };
        return removeUser();
    }, []);

    const editUserAdmin = useCallback((userId: number, authCredentialsDto: AuthCredentialsDto) => {
        const editUser = async () => {
            try {
                const user = await devicesApi
                    .withPostMiddleware(postMiddleware(dispatch))
                    .usersControllerEditUser({userId, authCredentialsDto});
                dispatch(usersSlice.actions.updateUser({
                    changes: user,
                    id: userId
                }));
                toast.success('Дані успішно оновлений.');
            } catch (e) {
                const res = await e.json();
                toast.error(res.error);
            }
        };
        return editUser();
    }, []);

    const updateUserPermissions = useCallback((usId: number, permissions: CreatePermissionDto) => {
        const updateUserPermissions = async () => {
            try {
                const perms = await permissionsApi
                    .withPostMiddleware(postMiddleware(dispatch))
                    .permissionsControllerUpdatePermissions({
                        userId: usId,
                        createPermissionDto: permissions
                    });
                const {user, id, ...rest} = perms;
                dispatch(usersSlice.actions.setUserPermissions(rest));
                dispatch(userGroupsSlice.actions.setUserPermissions(rest));
                return rest;
            } catch (e) {
                toast.error(e.statusText);
                return undefined;
            }
        };
        return updateUserPermissions();
    }, []);

    return {
        getUsersWithDevices,
        removeUserAdmin,
        editUserAdmin,
        getUsersPermissions,
        updateUserPermissions
    };
};
