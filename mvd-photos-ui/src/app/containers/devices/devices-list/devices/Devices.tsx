import React from 'react';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core';
import {Device} from 'openapi/src';
import {DeviceStatus} from '../device-status';
import AddDeviceForm from './AddDeviceForm';
import EditDevice from './EditDevice';
import {useAddDevice} from './hooks/useAddDevice';
import {useSelectDevice} from './hooks/useSelectDevice';
import {useStyles} from './formStyles';
import {useEditDevice} from './hooks/useEditDevice';
import {Battery} from './Battery';
import {PermissionsClickInterceptor} from '../../../../hooks/useRestrictions';


type Props = {
    removeDevice(id: number): void;
    devices: Device[]
}

export const Devices: React.FC<Props> = ({removeDevice, devices}: Props) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const {handleAddDevice, showAddModal, handleCloseAddModal, handleOpenAddModal} = useAddDevice();
    const {deviceToUpdate, handleCloseEditModal, handleOpenEditModal, handleEditDevice} = useEditDevice();
    const {selected, handleSelectDevice} = useSelectDevice();
    const classes = useStyles();

    return (
        <Grid container direction="column" alignItems="stretch">
            <Box alignSelf="center" mb={1}>
                <PermissionsClickInterceptor permissions="addDevice">
                    <Button variant="contained" color="primary" onClick={handleOpenAddModal}>
                        Додати Новий Пристрій
                    </Button>
                </PermissionsClickInterceptor>
            </Box>
            <List component="nav">
                {devices.length > 0 && devices.map((device) => (
                    <ListItem
                        key={device.id}
                        button
                        selected={selected === device.id}
                        onClick={() => handleSelectDevice(device.id)}
                    >
                        <ListItemText primary={device.name} />
                        <ListItemSecondaryAction className={classes.deviceFormAction}>
                            <Battery level={device.battery || 1}/>
                            <PermissionsClickInterceptor permissions="editDevice">
                                <IconButton edge="end" onClick={() => handleOpenEditModal(device.id)} size="small">
                                    <SettingsIcon />
                                </IconButton>
                            </PermissionsClickInterceptor>
                            <PermissionsClickInterceptor permissions="removeDevice">
                                <IconButton edge="end" onClick={() => removeDevice(device.id)} size="small">
                                    <DeleteIcon />
                                </IconButton>
                            </PermissionsClickInterceptor>
                            <DeviceStatus device={device}/>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            {showAddModal && (
                <AddDeviceForm
                    onApprove={handleAddDevice}
                    onDecline={handleCloseAddModal}
                    onClose={handleCloseAddModal}
                    size={matches ? '60%' : '90%'}
                />
            )}
            {deviceToUpdate && (
                <EditDevice
                    device={deviceToUpdate}
                    onApprove={handleEditDevice}
                    onClose={handleCloseEditModal}
                    size="unset"
                />
            )}
        </Grid>
    );
};
