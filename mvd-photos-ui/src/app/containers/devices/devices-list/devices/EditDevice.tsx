import React, {useCallback, useState} from 'react';
import {CreateDeviceDto, Device} from 'openapi/src';

import {withModal} from 'components/modal';
import {EditDeviceForm} from './EditDeviceForm';
import {CellsCelection} from 'containers/devices/devices-list/devices/CellsCelection';
import Box from '@material-ui/core/Box';

type Props = {
    onApprove: (obj: CreateDeviceDto, id: number) => void;
    device: Device;
    onClose: () => void;
};

export const EditDevice: React.FC<Props> = ({onApprove, device, onClose}: Props) => {
    const [selected, setSelected] = useState(device.movementCells);
    const handleSelect = useCallback((x: number, y: number) => {
        const item = `${x},${y}`;
        const found = selected.find(s => s === item);
        if (found) {
            setSelected(sel => sel.filter(s => s !== item));
        } else {
            setSelected(sel => [...sel, item]);
        }
    }, [selected]);

    const handleApprove = useCallback((obj: CreateDeviceDto, id: number) => {
        onApprove({...obj, movementCells: selected}, id);
    }, [selected, onApprove]);

    return (
        <Box display="flex" flexWrap="wrap" justifyContent="space-between">
            <CellsCelection
                selected={selected}
                onSelect={handleSelect}
                deviceId={device.id}
            />
            <EditDeviceForm
                device={device}
                onApprove={handleApprove}
                onClose={onClose}
            />
        </Box>
    );
};

export default withModal(EditDevice);
