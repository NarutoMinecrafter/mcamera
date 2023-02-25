import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {useUsersService} from './useUsersService';

const useUserPermissions = () => {
    const {getUsersPermissions} = useUsersService();
    const user = useSelector(state => state.users.currentUser);

    useEffect(() => {
        if (user) {
            getUsersPermissions();
        }
    }, [user]);
};

export {
    useUserPermissions
};
