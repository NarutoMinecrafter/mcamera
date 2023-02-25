import React, {useContext} from 'react';

import {toast} from 'react-toastify';
import {DialogContext} from 'components/alert-dialog';
import {Users} from './users';
import {useUsersService} from '../../../services/user/useUsersService';
import {useHistory} from 'react-router-dom';
import {useUserGroups} from '../../../services/userGroups/useUserGroups';
import {useUserGroupsService} from '../../../services/userGroups/useUserGroupsService';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';


export const UsersController: React.FC = () => {

    const {setDialogObj} = useContext(DialogContext);
    const {userGroups} = useUserGroups();
    const {removeUserAdmin} = useUsersService();
    const {removeUserGroup} = useUserGroupsService();
    const history = useHistory();

    const handleAddUser = () => {
        history.push('/users/add');
    };

    const handleAddLocalUser = (userGroupId: number) => {
        history.push(`/users/add/${userGroupId}`);
    };

    const handleEditUser = (userId: number, userGroupId: number) => {
        history.push(`/users/edit/${userId}/${userGroupId}`);
    };

    const handleRemoveUser = (id: number) => {
        const userGroup = userGroups.find(ug => ug.users.find(u => u.id === id));
        if ((userGroup?.devices?.length || 0) > 0 && userGroup?.users?.length === 1) {
            toast.error('Неможливо видалити поки є активні пристрої.');
            return;
        }
        setDialogObj({
            text: 'Видалити користувача?',
            title: 'Попередження',
            isShown: true,
            onApprove: async () => {
                await removeUserAdmin(id);
                if (userGroup?.users.length === 1) {
                    removeUserGroup(userGroup.id);
                }
            }
        });
    };

    const handleRemoveUserGroup = (id: number) => {
        const userGroup = userGroups.find(ug => ug.id === id);
        if ((userGroup?.devices?.length || 0) > 0) {
            toast.error('Неможливо видалити поки є активні пристрої.');
            return;
        }
        if ((userGroup?.users?.length || 0) > 0) {
            toast.error('Неможливо видалити поки є активні користувачі.');
            return;
        }
        setDialogObj({
            text: 'Видалити группу користувачів?',
            title: 'Попередження',
            isShown: true,
            onApprove: () => {
                if (userGroups[0].id === id) {
                    toast.error('Не можна видалити групу системного користувача');
                } else {
                    removeUserGroup(id);
                }
            }
        });
    };

    return (
        <Box>
            <Box pb={2}>
                <Button variant="contained" color="primary" onClick={handleAddUser}>
                    Додати Нового Користувача (группа)
                </Button>
            </Box>
            {userGroups.map(ug => (
                <Users
                    key={ug.id}
                    editUser={id => handleEditUser(id, ug.id)}
                    removeUser={handleRemoveUser}
                    users={ug.users}
                    handleAddLocalUser={() => handleAddLocalUser(ug.id)}
                    handleRemoveGroup={() => handleRemoveUserGroup(ug.id)}
                />
            ))}
        </Box>
    );
};
