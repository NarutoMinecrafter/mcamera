import React, {PropsWithChildren} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

type Props = {
    isLoading: boolean;
    size?: number | string;
}

function LoaderItem({isLoading, children, size = 24}: PropsWithChildren<Props>) {
    return (
        <>
            {isLoading ? (
                <CircularProgress size={size} style={{marginRight: '8px'}}/>
            ) : null}
            {children}
        </>
    );
}

export default LoaderItem;
