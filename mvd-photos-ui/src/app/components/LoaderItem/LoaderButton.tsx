import React, {PropsWithChildren} from 'react';
import {Button, ButtonProps} from '@material-ui/core';
import LoaderItem from './LoaderItem';

type Props = {
    isLoading: boolean;
    loaderSize?: number | string;
}

function LoaderButton<P extends ButtonProps>({
    isLoading, disabled, children, loaderSize, ...rest
}: PropsWithChildren<Props & P>) {
    return (
        <Button {...{
            disabled: disabled || isLoading,
            ...rest
        }}
        >
            <LoaderItem isLoading={isLoading} size={loaderSize}>
                {children}
            </LoaderItem>
        </Button>
    );
}

export default LoaderButton;
