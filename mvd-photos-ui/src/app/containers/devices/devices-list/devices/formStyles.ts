import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '45ch'
            },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch'
        },
        row: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            alignItems: 'flex-end'
        },
        rowDivider: {
            marginTop: theme.spacing(6)
        },
        buttonsRow: {
            justifyContent: 'center'
        },
        mr: {
            marginRight: theme.spacing(2)
        },
        mt: {
            marginTop: theme.spacing(2)
        },
        mb: {
            marginBottom: theme.spacing(2)
        },
        deviceFormAction: {
            display: 'flex',
            alignItems: 'center'
        }
    })
);
