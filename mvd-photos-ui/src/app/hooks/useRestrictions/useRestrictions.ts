import {useSelector} from 'react-redux';
import {CreatePermissionDto} from 'openapi/src';
import {PermissionType} from './types';

export const getIsAllowed = (permissions: CreatePermissionDto) => (
    allowed: PermissionType[] | PermissionType
) => (Array.isArray(allowed) ? allowed : [allowed])
    .every(pt => Object.entries(permissions).filter(([, val]) => val).map(([key]) => key).includes(pt));

export const useRestrictions = (allowed: PermissionType[] | PermissionType) => {
    const userPermissions = useSelector(state => state.users.userPermissions);
    const isAllowed = getIsAllowed(userPermissions)(allowed);
    return {
        isAllowed
    };
};
