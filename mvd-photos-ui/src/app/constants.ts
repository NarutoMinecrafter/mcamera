import {CreateDeviceDto, CreateDeviceDtoCircleDurationDuringMoveSensorUnitEnum} from 'openapi/src';

export const DefaultValues: CreateDeviceDto = {
    identifier: '',
    name: '',
    scheduleFrequencyPhoto: 1,
    scheduleDurationPhoto: 1,
    scheduleFramesQuantity: 1,
    movementCells: [],
    movementDiffLevel: 1,
    movementChangeFrameTime: 1,
    movementFrequencyAnalyzing: 1,
    circleDurationBeforeMoveSensor: 1,
    circleFramesQuantityBeforeMove: 1,
    circleDurationDuringMoveSensorUnit: CreateDeviceDtoCircleDurationDuringMoveSensorUnitEnum.Seconds,
    circleDurationDuringMoveSensor: 1,
    circleFramesQuantityDuringMove: 1,
    circleDurationAfterMoveSensor: 1,
    circleFramesQuantityAfterMove: 1,
    randomSymbols: ''
};
