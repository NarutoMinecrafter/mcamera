import {Device} from '../../devices/device.entity';
import {TimeUnit} from '../../devices/time-unit.enum';
import {CreateDeviceDto} from '../../devices/dto/create-device.dto';

const convertMinsToMs = (val: number) => val * 60 * 1000;
const convertSecsToMs = (val: number) => val * 1000;

export const createSettingsPacket = ({
    identifier, name,
    scheduleFrequencyPhoto, scheduleDurationPhoto, scheduleFramesQuantity,
    movementCells, movementDiffLevel, movementChangeFrameTime, movementFrequencyAnalyzing,
    circleDurationBeforeMoveSensor, circleFramesQuantityBeforeMove, circleDurationDuringMoveSensor,
    circleFramesQuantityDuringMove, circleDurationAfterMoveSensor, circleFramesQuantityAfterMove,
    circleDurationDuringMoveSensorUnit, randomSymbols
}: Device): CreateDeviceDto  => ({
    identifier,
    name,
    scheduleFrequencyPhoto: convertSecsToMs(scheduleFrequencyPhoto),
    scheduleDurationPhoto: convertSecsToMs(scheduleDurationPhoto),
    scheduleFramesQuantity,
    movementCells,
    movementDiffLevel,
    movementChangeFrameTime: convertMinsToMs(movementChangeFrameTime),
    movementFrequencyAnalyzing: convertSecsToMs(movementFrequencyAnalyzing),
    circleDurationBeforeMoveSensor: convertSecsToMs(circleDurationBeforeMoveSensor),
    circleFramesQuantityBeforeMove,
    circleDurationDuringMoveSensor: (circleDurationDuringMoveSensorUnit === TimeUnit.Minutes ? convertMinsToMs : convertSecsToMs)(circleDurationDuringMoveSensor),
    circleFramesQuantityDuringMove,
    circleDurationAfterMoveSensor: convertSecsToMs(circleDurationAfterMoveSensor),
    circleFramesQuantityAfterMove,
    circleDurationDuringMoveSensorUnit,
    randomSymbols
});
