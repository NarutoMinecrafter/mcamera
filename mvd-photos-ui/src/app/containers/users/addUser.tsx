import React, {useCallback, useContext} from 'react';
import {DialogContext} from 'components/alert-dialog';
import {AuthCredentialsDto} from 'openapi/src';
import {UserForm} from './shared/userForm';
import {useSignIn} from '../../services/signin/useSignIn';
import {withModal} from 'components/modal';
import {RouteComponentProps, useHistory} from 'react-router-dom';
import {useUserGroupsService} from '../../services/userGroups/useUserGroupsService';


type Props = {
    onClose: () => void;
} & RouteComponentProps<{userGroupId: string}>;

export const AddUser: React.FC<Props> = ({onClose, match: {params: {userGroupId}}}: Props) => {
    const {setDialogObj} = useContext(DialogContext);
    const {signup} = useSignIn(userGroupId);
    const {getUserGroups} = useUserGroupsService();
    const onApprove = useCallback((authCredentialsDto: AuthCredentialsDto) => {
        setDialogObj({
            text: 'Додати Нового Користувача?',
            title: 'Попередження',
            isShown: true,
            onApprove: async () => {
                await signup(authCredentialsDto);
                getUserGroups();
                onClose();
            },
            onCancel: onClose
        });
    }, []);

    const onCancel = useCallback(() => {
        onClose();
    }, []);

    return (
        <UserForm
            title="Додати Нового Користувача"
            onApprove={onApprove}
            onCancel={onCancel}
        />
    );
};

const WithModalAddUser = withModal(AddUser);

export const ModalAddUser: React.FC<RouteComponentProps<{userGroupId: string}>> = (props) => {
    const history = useHistory();
    const handleClose = useCallback(() => {
        history.push('/users');
    }, []);

    return (
        <WithModalAddUser
            onClose={handleClose}
            {...props}
        />
    );
};
