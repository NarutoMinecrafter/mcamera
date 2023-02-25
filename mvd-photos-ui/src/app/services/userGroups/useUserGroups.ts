import {useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {userGroupsSelectors} from './userGroupsSliceAdapter';
import {useUserGroupsService} from './useUserGroupsService';


export const useUserGroups = () => {

    const userGroups = useSelector(userGroupsSelectors.selectAll);
    const {getUserGroups} = useUserGroupsService();

    const initUserGroups = useCallback(() => {
        getUserGroups();
    }, []);

    useEffect(() => {
        initUserGroups();
    }, []);

    return {
        userGroups,
        initUserGroups
    };
};
