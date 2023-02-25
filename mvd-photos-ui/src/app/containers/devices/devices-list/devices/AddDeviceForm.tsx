import React, {useCallback, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import {CreateDeviceDto} from 'openapi/src';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useStyles} from './formStyles';
import {AddDeviceType} from 'containers/devices/devices-list/devices/types';
import {withModal} from 'components/modal';

type Props = {
    onApprove: (obj: AddDeviceType) => void;
    onDecline: () => void;
};

export const AddDeviceForm: React.FC<Props> = ({onApprove, onDecline}: Props) => {

    const classes = useStyles();

    const [formObj, setFormObj] = useState<AddDeviceType>({
        identifier: '',
        name: ''
    });
    const [errObj, setErrObj] = useState<{[key in keyof AddDeviceType]?: boolean}>({
        identifier: formObj.identifier === ''
    });

    const handleFieldChange = (
        key: keyof CreateDeviceDto
    ): React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> => e => {
        setErrObj({
            ...errObj,
            [key]: e.target.value.length === 0
        });
        if (key === 'identifier') {
            setErrObj({
                ...errObj,
                [key]: e.target.value.length === 0
            });
        }
        setFormObj({...formObj, [key]: e.target.value});
    };

    const handleApprove = useCallback(() => {
        onApprove(formObj);
    }, [formObj]);

    const handleCancel = useCallback(() => {
        onDecline();
    }, []);

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div className={`${classes.row} ${classes.mt} ${classes.mb}`}>
                <Typography component="h4" variant="h4">
                    Додати новий пристрій
                </Typography>
            </div>
            <div className={classes.row}>
                <TextField
                    variant="outlined"
                    required
                    label="ID Пристрія"
                    value={formObj.identifier}
                    error={errObj.identifier}
                    onChange={handleFieldChange('identifier')}
                    helperText={errObj.identifier && formObj.identifier.length > 0 ? 'Невірний формат' : ''}
                />
                <TextField
                    variant="outlined"
                    label="Ім'я Пристрія"
                    required
                    value={formObj.name}
                    error={errObj.identifier}
                    onChange={handleFieldChange('name')}
                />
            </div>
            <div className={`${classes.row} ${classes.buttonsRow} ${classes.rowDivider}`}>
                <Button
                    className={classes.mr}
                    variant="contained"
                    color="primary"
                    onClick={handleApprove}
                    disabled={Object.values(errObj).some(Boolean)}>
                    Підтвердити
                </Button>
                <Button
                    variant="contained"
                    color="default"
                    onClick={handleCancel}>
                    Скасувати
                </Button>
            </div>
        </form>
    );
};

export default withModal(AddDeviceForm);
