import Button from '@material-ui/core/Button';
import Home from '@material-ui/icons/Home';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    icon: {
        width: 192,
        height: 192,
        color: theme.palette.secondary.main
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    paper: {
        backgroundColor: theme.palette.background.default,
        margin: 0,
        height: 'calc(100vh - 64px)'
    },
    button: {
        marginTop: 20
    }
}));

export const NotFound: React.FC = () => {

    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <div className={classes.container}>
                <Typography variant="h4">404</Typography>
                <Typography variant="subtitle1">
                    Сторінку не знайдено
                </Typography>
                <Button
                    color="secondary"
                    aria-label="home"
                    href="/"
                    className={classes.button}>
                    <Home/>
                </Button>
            </div>
        </Paper>
    );
};
