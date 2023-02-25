import React, {useCallback} from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import {Button, makeStyles} from '@material-ui/core';
import {useHistory} from 'react-router';

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing(80),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        outline: 'none',
        left: `calc(50% - ${theme.spacing(40)}px)`,
        top: '25%'
    }
}));

const NotAuthedModal = () => {
    const classes = useStyles();
    const history = useHistory<{ fromRenderRoutes?: boolean }>();

    const handleBack = useCallback(() => {
        history.go(history.location.state?.fromRenderRoutes ? -2 : -1);
    }, [history]);

    return (
        <Modal open>
            <Box className={classes.paper}>
                <Typography variant="h3" gutterBottom>
                    Недостатньо прав.
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Зверніться до власника облікового запису.
                </Typography>
                <Box marginTop={5}>
                    <Button
                        size="large"
                        color="primary"
                        variant="contained"
                        onClick={handleBack}
                    >
                        Повернутися
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default NotAuthedModal;
