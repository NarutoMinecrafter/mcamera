import deepEqual from 'fast-deep-equal';
import React, {useEffect, useState} from 'react';
import {PermissionType} from '../../../hooks/useRestrictions/types';
import {CreatePermissionDto} from 'openapi/src';

export const usePermissions = (permissions: CreatePermissionDto) => {
    const [permissionsValues, setPermissionsValues] = useState({...permissions});

    const memoizedPermissions = React.useRef<CreatePermissionDto>({...permissions});

    useEffect(() => {
        if (!deepEqual(memoizedPermissions.current, permissions)) {
            setPermissionsValues({...permissions});
            memoizedPermissions.current = {...permissions};
        }
    }, [permissions]);

    const handleChange = (name: PermissionType) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setPermissionsValues({
            ...permissionsValues,
            [name]: checked
        });
    };

    return {
        handleChange,
        permissionsValues
    };
};

export type UsePermissionsType = ReturnType<typeof usePermissions>;
