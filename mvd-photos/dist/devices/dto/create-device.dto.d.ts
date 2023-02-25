import { TimeUnit } from '../time-unit.enum';
export declare class CreateDeviceDto {
    identifier: string;
    name: string;
    randomSymbols: string;
    scheduleFrequencyPhoto: number;
    scheduleDurationPhoto: number;
    scheduleFramesQuantity: number;
    movementCells: string[];
    movementDiffLevel: number;
    movementChangeFrameTime: number;
    movementFrequencyAnalyzing: number;
    circleDurationBeforeMoveSensor: number;
    circleFramesQuantityBeforeMove: number;
    circleDurationDuringMoveSensorUnit: TimeUnit;
    circleDurationDuringMoveSensor: number;
    circleFramesQuantityDuringMove: number;
    circleDurationAfterMoveSensor: number;
    circleFramesQuantityAfterMove: number;
}
