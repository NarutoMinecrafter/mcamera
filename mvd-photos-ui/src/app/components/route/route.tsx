import React from 'react';
import {Redirect} from 'react-router';
import {Route as ReactRoute} from 'react-router-dom';


export type Props = {
    path: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: React.FC<any>;
    exact?: boolean;
    canActive?: () => boolean;
    redirectTo?: string;
};

const Route: React.FC<Props> = ({canActive = () => true, redirectTo = '/', ...props}: Props) => {
    return (
        <>
            {canActive() ? (
                <ReactRoute {...props} />
            ) : (
                <Redirect from={props.path} to={redirectTo} exact/>
            )}
        </>
    );
};

export default Route;
