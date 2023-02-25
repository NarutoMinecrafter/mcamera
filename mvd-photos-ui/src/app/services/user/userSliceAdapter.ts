import {
    createEntityAdapter,
    createSlice, PayloadAction
} from '@reduxjs/toolkit';
import {CreatePermissionDto, Device, PacketStatusEnum, User} from 'openapi/src';
import {RootState} from '../../reducers/rootReducer';

const initialState: {
    currentUser: User | null;
    error: string;
    userPermissions: CreatePermissionDto;
} = {
    currentUser: null,
    error: '',
    userPermissions: {
        addDevice: false,
        removeDevice: false,
        editDevice: false,
        download: false,
        removePhoto: false
    }
};

const usersAdapter = createEntityAdapter<User>();

const usersSlice = createSlice({
    name: 'users',
    initialState: usersAdapter.getInitialState(initialState),
    reducers: {
        userAdded: usersAdapter.addOne,
        usersReceived: usersAdapter.setAll,
        removeUser: usersAdapter.removeOne,
        updateUser: usersAdapter.updateOne,
        setCurrentUser(state, action: PayloadAction<User | null>) {
            state.currentUser = action.payload;
            state.error = '';
        },
        updateDeviceStatusAdmin(state, action: PayloadAction<{id: number; status: PacketStatusEnum}>) {
            state.ids.forEach(u => {
                const index = state.entities[u]?.userGroups
                    .devices.findIndex(dev => dev.id === action.payload.id) || -1;
                if (index !== -1) {
                    const ent = state.entities[u];
                    if (ent) {
                        ent.userGroups.devices[index].packet.status = action.payload.status;
                    }
                }
            });
        },
        updateDeviceActionAdmin(state, action: PayloadAction<Device>) {
            state.ids.forEach(u => {
                const index = state.entities[u]?.userGroups.devices
                    .findIndex(dev => dev.id === action.payload.id) || -1;
                if (index !== -1) {
                    const ent = state.entities[u];
                    if (ent) {
                        ent.userGroups.devices[index] = action.payload;
                    }
                }
            });
        },
        addDeviceActionAdmin(state, action: PayloadAction<{device: Device; userId: number}>) {
            const userId =  state.ids.find(u => u === action.payload.userId);
            if (userId) {
                state.entities[userId]?.userGroups.devices.push(action.payload.device);
            }
        },
        removeDeviceActionAdmin(state, action: PayloadAction<{userId: number; deviceId: number}>) {
            const userId =  state.ids.find(u => u === action.payload.userId);
            if (userId) {
                const entity = state.entities[userId];
                if (entity) {
                    entity.userGroups.devices = entity.userGroups.devices
                        .filter(d => d.id !== action.payload.deviceId);
                }
            }
        },
        setUserPermissions(state, action: PayloadAction<CreatePermissionDto & {userId: number}>) {
            const {userId, ...rest} = action.payload;
            const user = state.entities[userId];
            if (user) {
                user.permission = {
                    ...user.permission,
                    ...rest
                };
            }
        },
        setCurrentUserPermissions(state, action: PayloadAction<CreatePermissionDto>) {
            state.userPermissions = action.payload;
        }
    }
});

const usersSelectors = usersAdapter.getSelectors<RootState>(
    (state) => state.users
);

export {
    usersSlice,
    usersSelectors
};
