import {AppDispatch} from './index';
import {updateWsConnectionStatus} from '../services/server/serverSlice';
import {wsPath} from '../services/basePath';
import {DeviceFromJSONTyped} from 'openapi/src';
import {devicesSlice} from '../services/devices/devicesSliceAdapter';


const socket = new WebSocket(wsPath());

const setupSocket = (dispatch: AppDispatch) => {

    socket.onopen = function() {
        console.log('Connected');
        dispatch(updateWsConnectionStatus(true));
        socket.onmessage = function({data}) {
            const parsed = JSON.parse(data);
            const device = DeviceFromJSONTyped(parsed.data, true);
            if (parsed.msg === 'RECEIVED_SETTINGS') {
                dispatch(devicesSlice.actions.updateDevice({
                    id: device.id,
                    changes: {...device}
                }));
            }
        };
    };

    socket.onclose = () => {
        dispatch(updateWsConnectionStatus(false));
    };

    return socket;
};

export default setupSocket;
