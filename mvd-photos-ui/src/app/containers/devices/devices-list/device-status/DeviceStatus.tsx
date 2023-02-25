import React, {useEffect, useState} from 'react';
import Box from '@material-ui/core/Box';
import PauseIcon from '@material-ui/icons/Pause';
import CheckIcon from '@material-ui/icons/Check';
import CircularProgress from '@material-ui/core/CircularProgress';
import Circle from '@material-ui/icons/Lens';
import {Device, PacketStatusEnum} from 'openapi/src';
import Tooltip from '@material-ui/core/Tooltip';
import {useDeviceStatus} from './useDeviceStatus';
import {theme} from '../../../../customTheme';


enum Status {
    CHECK = 'CHECK',
    SENDING = 'SENDING',
    WAITING = 'WAITING'
}

const IconResolver = {
    [Status.WAITING]: <PauseIcon style={{color: theme.palette.info.main}}/>,
    [Status.SENDING]: <CircularProgress size="1.5rem"/>,
    [Status.CHECK]: <CheckIcon style={{color: theme.palette.info.main}}/>
};

type Props = {
    device: Device;
}

export const DeviceStatus: React.FC<Props> = ({device}: Props) => {

    const {deviceStatus} = useDeviceStatus(device.packet.lastPacketTime);

    const [commandStatus, setCommandStatus] = useState<Status>(Status.WAITING);

    useEffect(() => {
        if (device.packet.status === PacketStatusEnum.NONE && commandStatus === Status.SENDING) {
            setCommandStatus(Status.CHECK);
            setTimeout(() => {
                setCommandStatus(Status.WAITING);
            }, 2000);
        } else if (device.packet.status === PacketStatusEnum.NONE) {
            setCommandStatus(Status.WAITING);
        } else if (
            device.packet.status === PacketStatusEnum.SENDING ||
            device.packet.status === PacketStatusEnum.TOSEND
        ) {
            setCommandStatus(Status.SENDING);
        }
    }, [device.packet.status]);


    return (
        <Box
            display="flex" alignItems="center"
            color={deviceStatus ? theme.palette.info.main : theme.palette.error.main}>
            <Tooltip title={deviceStatus ? 'Online' : 'Offline'} placement="top">
                <Circle/>
            </Tooltip>
            {IconResolver[commandStatus]}
        </Box>
    );
};
