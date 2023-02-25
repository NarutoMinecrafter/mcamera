import React, {MouseEvent, useCallback, forwardRef} from 'react';
import {useHistory} from 'react-router';
import {useRestrictions} from './useRestrictions';
import {PermissionType} from './types';

type Props = {
    permissions: PermissionType[] | PermissionType;
}

// eslint-disable-next-line react/display-name
export const PermissionsClickInterceptor: React.FC<Props> = forwardRef(({children, permissions}, ref) => {
    const history = useHistory();
    const {isAllowed} = useRestrictions(permissions);

    const onClickCaptureHandler = useCallback((e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        e.preventDefault();
        history.push('/modals/notAllowed');
    }, [history]);

    return isAllowed ? (<>{children}</>) : (
        <div onClickCapture={onClickCaptureHandler} onSubmitCapture={onClickCaptureHandler}>
            {children}
        </div>
    );
});
