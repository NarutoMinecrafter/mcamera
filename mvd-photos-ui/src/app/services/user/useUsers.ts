import {useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useUsersService} from './useUsersService';
import {usersSelectors} from './userSliceAdapter';


export const useUsers = () => {

    const users = useSelector(usersSelectors.selectAll);
    const {getUsersWithDevices} = useUsersService();

    const initUsers = useCallback(() => {
        getUsersWithDevices();
    }, []);

    useEffect(() => {
        initUsers();
    }, []);

    return {
        initUsers,
        users
    };
};
