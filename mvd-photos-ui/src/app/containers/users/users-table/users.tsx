import React from 'react';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {Accordion, AccordionDetails, AccordionSummary} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {User} from 'openapi/src';
import {UserRow} from './user';
import UserFormPermissions from 'containers/users/Permissions/UserFormPermissions';
import List from '@material-ui/core/List';


type Props = {
    editUser(id: number): void;
    removeUser(id: number): void;
    handleAddLocalUser(): void;
    handleRemoveGroup(): void;
    users: User[];
}

export const Users: React.FC<Props> = (
    {editUser, removeUser, users, handleAddLocalUser, handleRemoveGroup}: Props
) => {
    return (
        <Grid container direction="column" spacing={3} alignItems="center">
            <Box alignSelf="center" display="flex" flexWrap="wrap" justifyContent="center">
                <Box p={1}>
                    <Button variant="contained" color="primary" onClick={handleAddLocalUser}>
                        Додати Користувача
                    </Button>
                </Box>
                <Box p={1}>
                    <Button variant="contained" color="secondary" onClick={handleRemoveGroup}>
                        Видалити группу
                    </Button>
                </Box>
            </Box>
            <Grid item xs={12}>
                <List>
                    {users.map((user, i) => (
                        <Accordion key={user.id}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <UserRow
                                    key={user.id}
                                    user={user}
                                    ind={i}
                                    removeUser={removeUser}
                                    editUser={editUser}
                                />
                            </AccordionSummary>
                            <AccordionDetails>
                                <UserFormPermissions userId={user.id} />
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </List>
            </Grid>
        </Grid>
    );
};
