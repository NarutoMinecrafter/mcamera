import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {User} from 'openapi/src';
import {ListItem, ListItemText} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    memberControls: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'flex-end'
        }
    }
}));

type Props = {
    user: User;
    ind: number;
    removeUser: (id: number) => void;
    editUser: (id: number) => void;
}

export const UserRow: React.FC<Props> = ({user, editUser, removeUser}: Props) => {
    const classes = useStyles();
    return (
        <ListItem>
            <Grid container>
                <Grid item xs={12} sm={6} className={classes.memberControls}>
                    <ListItemText
                        primary={user.username}
                    />
                </Grid>
                <Grid item xs={12} sm={6} className={classes.memberControls}>
                    {user.isAdmin && (
                        <Typography variant="h6">
                            Админ
                        </Typography>
                    )}
                    <IconButton aria-label="edit" onClick={() => editUser(user.id)} edge="end">
                        <EditIcon color="primary"/>
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => removeUser(user.id)} edge="end">
                        <DeleteIcon color="error"/>
                    </IconButton>
                </Grid>
            </Grid>
        </ListItem>
    );
};
