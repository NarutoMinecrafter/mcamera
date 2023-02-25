import React, {useCallback, useMemo, useState} from 'react';
import {Box} from '@material-ui/core';
import {Permissions} from '../Permissions';
import {usePermissions} from '../Permissions/usePermissions';
import {PermissionsValues} from 'containers/users/Permissions/constants';
import {LoaderButton} from 'components/LoaderItem';
import {useSelector} from 'react-redux';
import {useUsersService} from '../../../services/user/useUsersService';
import {userGroupsSelectors} from '../../../services/userGroups';

type Props = {
    userId: number;
}

export const UserFormPermissions: React.FC<Props> = ({userId}) => {
    const userGroups = useSelector(userGroupsSelectors.selectAll);
    const permissions = userGroups.flatMap(ug => ug.users).find(u => u.id === userId)?.permission || {
        download: false, addDevice: false, removeDevice: false, editDevice: false, removePhoto: false
    };
    const usePermissionsProps = usePermissions(permissions);
    const {updateUserPermissions} = useUsersService();
    const [saving, setSaving] = useState(false);

    const addHandler = useCallback(async () => {
        setSaving(true);
        await updateUserPermissions(userId, usePermissionsProps.permissionsValues);
        setSaving(false);
    }, [usePermissionsProps.permissionsValues, userId, updateUserPermissions]);

    const isChanged = useMemo(() => {
        const defaultState = {...permissions};
        return PermissionsValues.some(pt => defaultState[pt] !== usePermissionsProps.permissionsValues[pt]);
    }, [permissions, usePermissionsProps.permissionsValues]);

    return (
        <Box display="flex" width="100%" alignItems="center">
            <Box flexGrow={1}>
                <Permissions {...usePermissionsProps} />
            </Box>
            <LoaderButton
                disabled={!isChanged || saving}
                variant="contained"
                color="primary"
                onClick={addHandler}
                isLoading={saving}
            >
                Зберегти
            </LoaderButton>
        </Box>
    );
};

export default UserFormPermissions;
