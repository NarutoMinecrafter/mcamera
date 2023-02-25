import React, {createContext, ReactNode, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';


type dialogObjType = {
    isShown: boolean;
    onApprove?: () => void;
    onCancel?: () => void;
    title: string;
    text: string;
} | null;

export const DialogContext = createContext<{dialogObj: dialogObjType; setDialogObj: (val: dialogObjType) => void;}>({
    dialogObj: null,
    setDialogObj: () => undefined
});

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            minWidth: theme.spacing(60)
        }
    })
);

type Props = {
    children?: ReactNode
};

export const AlertDialog: React.FC<Props> = ({children}: Props) => {

    const classes = useStyles();
    const [dialogObj, setDialogObj] = useState<dialogObjType>(null);

    const handleApprove = () => {
        dialogObj?.onApprove?.();
        setDialogObj(null);
    };

    const handleCancel = () => {
        dialogObj?.onCancel?.();
        setDialogObj(null);
    };

    return (
        <>
            <DialogContext.Provider value={{dialogObj, setDialogObj}}>
                {children}
            </DialogContext.Provider>
            {dialogObj && (
                <Dialog
                    classes={{paper: classes.paper}}
                    open={dialogObj.isShown}
                    onClose={() => setDialogObj(null)}>
                    <DialogTitle>
                        {dialogObj.title}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {dialogObj.text}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleApprove} color="primary">
                            Підтвердити
                        </Button>
                        <Button onClick={handleCancel} color="primary" autoFocus>
                            Скасувати
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
};
