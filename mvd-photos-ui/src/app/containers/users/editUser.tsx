import React, {useCallback, useContext} from 'react';
import {RouteComponentProps, useHistory} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import {DialogContext} from 'components/alert-dialog';
import {AuthCredentialsDto} from 'openapi/src';
import {UserForm} from './shared/userForm';
import {useUsersService} from '../../services/user/useUsersService';
import {withModal} from 'components/modal';
import {useSelector} from 'react-redux';
import {useUserGroupsService} from '../../services/userGroups/useUserGroupsService';
import {userGroupsSelectors} from '../../services/userGroups';


type Props = {
    onClose: () => void;
} & RouteComponentProps<{userId: string; userGroupId: string}>;

export const EditUser: React.FC<Props> = ({onClose, match: {params: {userId, userGroupId}}}: Props) => {
    const userGroup = useSelector(state => userGroupsSelectors.selectById(state, userGroupId));
    const user = userGroup?.users.find(u => u.id === +userId);
    const {setDialogObj} = useContext(DialogContext);
    const {editUserAdmin} = useUsersService();
    const {getUserGroups} = useUserGroupsService();

    const onApprove = useCallback((authCredentialsDto: AuthCredentialsDto) => {
        setDialogObj({
            text: 'Підтвердити нові дані користувача?',
            title: 'Попередження',
            isShown: true,
            onApprove: async () => {
                if (user) {
                    await editUserAdmin(user.id, authCredentialsDto);
                    getUserGroups();
                }
                onClose();
            },
            onCancel: onClose
        });
    }, []);

    const onCancel = useCallback(() => {
        onClose();
    }, []);

    return user ? (
        <UserForm
            userData={{...user, password: ''}}
            title="Редагувати Користувача"
            onApprove={onApprove}
            onCancel={onCancel}
        />
    ) : (
        <Typography variant="h6">
            Користувач не знайдений
        </Typography>
    );
};

const WithModalEditUser = withModal(EditUser);

export const ModalEditUser: React.FC<RouteComponentProps<{userId: string; userGroupId: string}>> = (props) => {
    const history = useHistory();
    const handleClose = useCallback(() => {
        history.push('/users');
    }, []);

    return (
        <WithModalEditUser
            onClose={handleClose}
            {...props}
        />
    );
};
