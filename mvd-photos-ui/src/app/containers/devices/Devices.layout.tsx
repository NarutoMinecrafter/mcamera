import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Paper} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: theme.spacing(2),
            maxHeight: 'calc(100vh - 300px)',
            overflow: 'auto',
            minWidth: theme.spacing(30)
        }
    })
);

export const DevicesLayout: React.FC = ({children}) => {
    const classes = useStyles();
    const childArr = React.Children.toArray(children);
    return (
        <Grid container justify="space-between" spacing={2}>
            <Grid item xs={12} md={4}>
                <Paper className={classes.paper}>
                    {childArr[0]}
                </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
                {childArr[1]}
            </Grid>
        </Grid>
    );
};
