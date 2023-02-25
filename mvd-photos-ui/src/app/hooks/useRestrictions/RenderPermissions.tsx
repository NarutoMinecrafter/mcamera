import React from 'react';
import {useRestrictions} from './useRestrictions';
import {PermissionType} from './types';

type RenderPermissionsProps = {
    permissions: PermissionType[] | PermissionType;
    children: React.ReactElement;
};

export const RenderPermissions: React.FC<RenderPermissionsProps> = ({
    children,
    permissions
}: RenderPermissionsProps) => {
    const {isAllowed} = useRestrictions(permissions);

    return isAllowed ? children : <></>;
};
