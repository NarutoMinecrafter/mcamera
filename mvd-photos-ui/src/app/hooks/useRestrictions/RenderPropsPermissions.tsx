import React from 'react';
import {useRestrictions} from './useRestrictions';
import {PermissionType} from './types';

type RenderPropsCounterProps = {
    permissions: PermissionType[] | PermissionType;
    children: (props: {
        isAllowed: boolean,
    }) => React.ReactElement;
}

export const RenderPropsPermissions: React.FC<RenderPropsCounterProps> = (
    {children, ...props}: RenderPropsCounterProps
) => children(useRestrictions(props.permissions));
