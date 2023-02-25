import React, {useContext, useEffect} from 'react';

import {DialogContext} from 'components/alert-dialog';
import {useDevices} from '../../../services/devices/useDevices';
import {useDevicesService} from '../../../services/devices/useDevicesService';
import {Devices} from './devices';
import {useHistory} from 'react-router';

export const DevicesController: React.FC = () => {
    const history = useHistory();
    const {setDialogObj} = useContext(DialogContext);
    const {devices} = useDevices();
    const {removeDevice} = useDevicesService();

    useEffect(() => {
        if (devices.length) {
            history.push(`/devices/${devices[0].id}`);
        }
    }, [devices.length]);

    const handleRemoveDevice = (id: number) => {
        setDialogObj({
            text: 'Видалити пристрій?',
            title: 'Попередження',
            isShown: true,
            onApprove: () => {
                removeDevice(id);
            }
        });
    };

    return (
        <Devices
            removeDevice={handleRemoveDevice}
            devices={devices}
        />
    );
};
