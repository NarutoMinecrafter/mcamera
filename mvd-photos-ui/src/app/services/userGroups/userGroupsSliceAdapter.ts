import {
    createEntityAdapter,
    createSlice, PayloadAction
} from '@reduxjs/toolkit';
import {CreatePermissionDto, UserGroups} from 'openapi/src';
import {RootState} from '../../reducers/rootReducer';

const userGroupsAdapter = createEntityAdapter<UserGroups>();

const userGroupsSlice = createSlice({
    name: 'users',
    initialState: userGroupsAdapter.getInitialState(),
    reducers: {
        userGroupsAdded: userGroupsAdapter.addOne,
        usersGroupsReceived: userGroupsAdapter.setAll,
        removeUserGroup: userGroupsAdapter.removeOne,
        setUserPermissions(state, action: PayloadAction<CreatePermissionDto & {userId: number}>) {
            const {userId, ...rest} = action.payload;
            const userGroup = Object.values(state.entities).find(ug => ug?.users.find(u => u.id === userId));
            if (userGroup) {
                const user = userGroup.users.find(u => u.id === userId);
                if (user) {
                    user.permission = {
                        ...user.permission,
                        ...rest
                    };
                }
            }
        },
        removeUser(state, action: PayloadAction<{userId: number}>) {
            const {userId} = action.payload;
            const userGroup = Object.values(state.entities).find(ug => ug?.users.find(u => u.id === userId));
            if (userGroup) {
                userGroup.users = userGroup.users.filter(u => u.id !== userId);
            }
        }
    }
});

const userGroupsSelectors = userGroupsAdapter.getSelectors<RootState>(
    (state) => state.userGroups
);

export {
    userGroupsSlice,
    userGroupsSelectors
};
