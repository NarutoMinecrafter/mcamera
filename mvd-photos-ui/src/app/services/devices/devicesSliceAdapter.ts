import {
    createEntityAdapter,
    createSlice
} from '@reduxjs/toolkit';
import {Device} from 'openapi/src';
import {RootState} from '../../reducers/rootReducer';


const devicesAdapter = createEntityAdapter<Device>();

const devicesSlice = createSlice({
    name: 'devices',
    initialState: devicesAdapter.getInitialState(),
    reducers: {
        deviceAdded: devicesAdapter.addOne,
        devicesReceived: devicesAdapter.setAll,
        removeDevice: devicesAdapter.removeOne,
        removeAllDevices: devicesAdapter.removeAll,
        updateDevice: devicesAdapter.updateOne
    }
});

const devicesSelectors = devicesAdapter.getSelectors<RootState>(
    (state) => state.devices
);

export {
    devicesSlice,
    devicesSelectors
};

export default devicesSlice.reducer;
