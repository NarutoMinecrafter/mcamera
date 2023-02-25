import React, {useState} from 'react';
import {CreateDeviceDto, CreateDeviceDtoCircleDurationDuringMoveSensorUnitEnum, Device} from 'openapi/src';
import {Formik, Form, Field} from 'formik';
import {TextField} from 'formik-material-ui';
import Button from '@material-ui/core/Button';
import {useStyles} from './formStyles';
import {withModal} from 'components/modal';
import {DefaultValues} from '../../../../constants';
import {validateRangeByField} from 'containers/devices/devices-list/devices/utils/validateRangeByField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {CustomInput} from 'components/custom-input/CustomInput';

type Props = {
    onApprove: (obj: CreateDeviceDto, id: number) => void;
    device: Device;
    onClose: () => void;
};

const validateRangeByDay = validateRangeByField(1, 1440);
const validatePercents = validateRangeByField(1, 100);
const validateByHour = validateRangeByField(1, 3600);

export const EditDeviceForm: React.FC<Props> = ({onApprove, device, onClose}: Props) => {
    const classes = useStyles();
    const {id, packet, userGroupsId, circleDurationDuringMoveSensorUnit, userGroups, photo, ...rest} = device;

    const [formObj, setFormObj] = useState<CreateDeviceDto>({
        ...DefaultValues,
        ...rest
    });

    return (
        <Formik
            initialValues={{
                ...DefaultValues,
                ...rest
            }}
            validate={values => {
                setFormObj(values);
                const errors: Partial<Record<keyof CreateDeviceDto, string>> = {};
                if (!values.identifier) {
                    errors.identifier = 'Required';
                }
                if (values.randomSymbols.length > 10) {
                    errors.randomSymbols = 'Not Valid';
                }
                if (!validateRangeByField(1, 86400)(values)('scheduleFrequencyPhoto')) {
                    errors.scheduleFrequencyPhoto = 'Not Valid';
                }
                if (!validateRangeByField(1, formObj.scheduleFrequencyPhoto * 30)(values)('scheduleDurationPhoto')) {
                    errors.scheduleDurationPhoto = 'Not Valid';
                }
                if (!validateRangeByField(1, formObj.scheduleDurationPhoto)(values)('scheduleFramesQuantity')) {
                    errors.scheduleFramesQuantity = 'Not Valid';
                }
                if (!validatePercents(values)('movementDiffLevel')) {
                    errors.movementDiffLevel = 'Not Valid';
                }
                if (!validateRangeByDay(values)('movementChangeFrameTime')) {
                    errors.movementChangeFrameTime = 'Not Valid';
                }
                // eslint-disable-next-line max-len
                if (!validateRangeByField(1, formObj.movementChangeFrameTime < 5 ? formObj.movementChangeFrameTime * 60 : 300)(values)('movementChangeFrameTime')) {
                    errors.movementFrequencyAnalyzing = 'Not Valid';
                }
                if (!validateRangeByField(0, 3600)(values)('circleDurationBeforeMoveSensor')) {
                    errors.circleDurationBeforeMoveSensor = 'Not Valid';
                }
                // eslint-disable-next-line max-len
                if (!validateRangeByField(0, formObj.circleDurationBeforeMoveSensor)(values)('circleFramesQuantityBeforeMove')) {
                    errors.circleFramesQuantityBeforeMove = 'Not Valid';
                }
                // eslint-disable-next-line max-len
                if (!validateRangeByField(1, formObj.circleDurationDuringMoveSensorUnit === CreateDeviceDtoCircleDurationDuringMoveSensorUnitEnum.Seconds ? 3600 : 1440)(values)('circleDurationDuringMoveSensor')) {
                    errors.circleDurationDuringMoveSensor = 'Not Valid';
                }
                if (!validateRangeByField(1, 3600)(values)('circleFramesQuantityDuringMove')) {
                    errors.circleFramesQuantityDuringMove = 'Not Valid';
                }

                if (!validateRangeByField(0, 3600)(values)('circleDurationAfterMoveSensor')) {
                    errors.circleDurationAfterMoveSensor = 'Not Valid';
                }
                // eslint-disable-next-line max-len
                if (!validateRangeByField(0, formObj.circleDurationAfterMoveSensor)(values)('circleFramesQuantityAfterMove')) {
                    errors.circleFramesQuantityAfterMove = 'Not Valid';
                }

                return errors;
            }}
            onSubmit={(values) => {
                onApprove(values, device.id);
            }}
        >
            {({submitForm, errors}) => (
                <Form>
                    <Typography variant="subtitle2" gutterBottom>
                        Загальні
                    </Typography>
                    <Box display="flex" flexWrap="wrap">
                        <Field
                            component={TextField}
                            name="identifier"
                            type="string"
                            label="ID Пристрія"
                            variant="outlined"
                            size="small"
                            className={classes.mr}
                        />
                        <Field
                            component={TextField}
                            type="string"
                            label="Ім'я Пристрія"
                            className={classes.mr}
                            variant="outlined"
                            name="name"
                            size="small"
                        />
                        <Field
                            component={TextField}
                            type="string"
                            label="Набір символів"
                            variant="outlined"
                            name="randomSymbols"
                            size="small"
                        />
                    </Box>
                    <br/>
                    <Typography variant="subtitle2" gutterBottom>
                        Налаштування зйомки фото за розкладом
                    </Typography>
                    <Box display="flex" flexDirection="column">
                        <CustomInput
                            type="number"
                            label="Частота виконання зйомки фото, с (1 - 86400)"
                            name="scheduleFrequencyPhoto"
                        />
                        <CustomInput
                            type="number"
                            label={`Тривалість періоду зйомки фото, с (1 - ${30 * formObj.scheduleFrequencyPhoto})`}
                            name="scheduleDurationPhoto"
                        />
                        <CustomInput
                            type="number"
                            // eslint-disable-next-line max-len
                            label={`Кількість кадрів фото за тривалість періоду зйомки (1 - ${formObj.scheduleDurationPhoto})`}
                            name="scheduleFramesQuantity"
                        />
                    </Box>
                    <br/>
                    <Typography variant="subtitle2">
                        Налаштування датчика руху
                    </Typography>
                    <Box display="flex" flexDirection="column">
                        <CustomInput
                            label={'Настройка рівня зміни між опорним і аналізованих кадрами, % (1 - 100)'}
                            name="movementDiffLevel"
                            type="number"
                        />
                    </Box>
                    <br/>
                    <Typography variant="subtitle2" gutterBottom>
                        Параметри кільцевого буфера кадрів до спрацьовування датчика руху:
                    </Typography>
                    <Box display="flex" flexDirection="column">
                        <CustomInput
                            type="number"
                            label={'Тривалість періоду зйомки фото, с. (0 - 3600)'}
                            name="circleDurationBeforeMoveSensor"
                        />
                        <CustomInput
                            type="number"
                            // eslint-disable-next-line max-len
                            label={`Кількість кадрів фото за тривалість періоду зйомки (1 - ${formObj.circleDurationBeforeMoveSensor})`}
                            name="circleFramesQuantityBeforeMove"
                        />
                    </Box>
                    <br/>
                    <Typography variant="subtitle2" gutterBottom>
                        Параметри кільцевого буфера кадрів під час спрацьовування датчика руху:
                    </Typography>
                    <Box display="flex" flexDirection="column" alignItems="flex-start">
                        <CustomInput
                            type="number"
                            // eslint-disable-next-line max-len
                            label={'Частота збереження фото, с (1 - 3600)'}
                            name="circleFramesQuantityDuringMove"
                        />
                    </Box>
                    <br/>
                    <Typography variant="subtitle2" gutterBottom>
                        Параметри кільцевого буфера кадрів по закінченню спрацьовування датчика руху:
                    </Typography>
                    <Box display="flex" flexDirection="column">
                        <CustomInput
                            type="number"
                            // eslint-disable-next-line max-len
                            label={'Тривалість періоду зйомки фото, с. (0 - 3600)'}
                            name="circleDurationAfterMoveSensor"
                        />
                        <CustomInput
                            type="number"
                            // eslint-disable-next-line max-len
                            label={`Кількість кадрів фото за тривалість періоду зйомки (1 - ${formObj.circleDurationAfterMoveSensor})`}
                            name="circleFramesQuantityAfterMove"
                        />
                    </Box>
                    <br/>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={Object.keys(errors).length > 0}
                        onClick={submitForm}
                    >
                        Редагувати
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={onClose}
                        style={{marginLeft: 8}}
                    >
                        Закрити
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default withModal(EditDeviceForm);
