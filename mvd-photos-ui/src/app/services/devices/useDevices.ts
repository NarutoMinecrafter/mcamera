import {useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useDevicesService} from './useDevicesService';
import {devicesSelectors} from './devicesSliceAdapter';


export const useDevices = () => {

    const devices = useSelector(devicesSelectors.selectAll);
    const {getDevices} = useDevicesService();

    const initDevices = useCallback(() => {
        getDevices();
    }, []);

    useEffect(() => {
        initDevices();
    }, []);

    return {
        initDevices,
        devices
    };
};
