import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Paper} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import clsx from 'clsx';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: theme.spacing(2),
            overflow: 'auto'
        },
        height: {
            height: 'calc(100vh - 340px)'
        }
    })
);

type Props = {
    header: React.ReactNode;
    message?: React.ReactNode;
    body?: React.ReactNode;
    timeSelector: React.ReactNode;
    pagination?: React.ReactNode;
}

export const PhotosLayout: React.FC<Props> = ({header, timeSelector, message, body, pagination}) => {
    const classes = useStyles();
    return (
        <Grid container direction="column" spacing={1}>
            <Grid item xs={12}>
                {header}
            </Grid>
            <Grid item xs={12}>
                {timeSelector}
            </Grid>
            {message && (
                <Grid item xs={12}>
                    {message}
                </Grid>
            )}
            {body && (
                <Grid item xs={12}>
                    <Paper className={clsx(classes.paper, classes.height)}>
                        {body}
                    </Paper>
                </Grid>
            )}
            {pagination && (
                <Grid item xs={12}>
                    {pagination}
                </Grid>
            )}
        </Grid>
    );
};
