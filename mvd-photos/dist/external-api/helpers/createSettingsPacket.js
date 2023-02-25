"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSettingsPacket = void 0;
const time_unit_enum_1 = require("../../devices/time-unit.enum");
const convertMinsToMs = (val) => val * 60 * 1000;
const convertSecsToMs = (val) => val * 1000;
const createSettingsPacket = ({ identifier, name, scheduleFrequencyPhoto, scheduleDurationPhoto, scheduleFramesQuantity, movementCells, movementDiffLevel, movementChangeFrameTime, movementFrequencyAnalyzing, circleDurationBeforeMoveSensor, circleFramesQuantityBeforeMove, circleDurationDuringMoveSensor, circleFramesQuantityDuringMove, circleDurationAfterMoveSensor, circleFramesQuantityAfterMove, circleDurationDuringMoveSensorUnit, randomSymbols }) => ({
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
    circleDurationDuringMoveSensor: (circleDurationDuringMoveSensorUnit === time_unit_enum_1.TimeUnit.Minutes ? convertMinsToMs : convertSecsToMs)(circleDurationDuringMoveSensor),
    circleFramesQuantityDuringMove,
    circleDurationAfterMoveSensor: convertSecsToMs(circleDurationAfterMoveSensor),
    circleFramesQuantityAfterMove,
    circleDurationDuringMoveSensorUnit,
    randomSymbols
});
exports.createSettingsPacket = createSettingsPacket;
//# sourceMappingURL=createSettingsPacket.js.map