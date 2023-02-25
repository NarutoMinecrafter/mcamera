import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import {useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid';


export const ServerAlert: React.FC = () => {

    const wsConnectionStatus = useSelector(state => state.server.wsConnectionStatus);

    return (
        !wsConnectionStatus ? (
            <Grid container={true} spacing={0} justify="center" style={{marginBottom: '16px'}}>
                <MuiAlert elevation={6} variant="filled" severity="error">
                    З&apos;єднання з сервером втрачено. Синхронізація пристроїв не працює.
                    Спробуйте перезавантажити сторінку.
                </MuiAlert>
            </Grid>
        ) : null
    );
};
