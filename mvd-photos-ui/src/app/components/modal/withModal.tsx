import React, {JSXElementConstructor} from 'react';
import {History} from 'history';
import Modal from '@material-ui/core/Modal';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';


type InjectedProps = {};

type ExtendedProps = {
    size?: string;
    onClose: () => void;
};

const useStyles = makeStyles<Theme, {size?: string}>((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            padding: theme.spacing(1),
            alignItems: 'center',
            justifyContent: 'center'
        },
        paper: {
            width: (p) => p.size || '80%',
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            maxHeight: '95%',
            overflow: 'auto'
        }
    })
);


const withModal = <P extends InjectedProps>(Cmp: JSXElementConstructor<P>) => {
    type InnerProps = Omit<P, keyof InjectedProps> & ExtendedProps

    const WithModal = (props: InnerProps) => {

        const {size, onClose, ...passThrough} = props;
        const classes = useStyles({size});

        return (
            <Modal onClose={onClose} open={true} className={classes.modal}>
                <div className={classes.paper}>
                    <Cmp {...{} as P} {...passThrough} {...{onClose}}/>
                </div>
            </Modal>
        );
    };
    return WithModal;
};

export default withModal;
