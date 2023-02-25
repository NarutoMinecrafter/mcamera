"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceSettingsValidationPipe = void 0;
const common_1 = require("@nestjs/common");
class DeviceSettingsValidationPipe {
    transform(createDeviceDto, metadata) {
        if (!this.isSettingsValid(createDeviceDto)) {
            throw new common_1.BadRequestException('invalid settings');
        }
        return createDeviceDto;
    }
    isSettingsValid(createDeviceDto) {
        if (!this.checkScheduleSettings(createDeviceDto)) {
            throw new common_1.BadRequestException('Invalid schedule settings');
        }
        if (!this.checkMovementSettings(createDeviceDto)) {
            throw new common_1.BadRequestException('Invalid Movement settings');
        }
        if (!this.checkCircleBeforeSettings(createDeviceDto)) {
            throw new common_1.BadRequestException('Invalid Circle Before settings');
        }
        if (!this.checkCircleAfterSettings(createDeviceDto)) {
            throw new common_1.BadRequestException('Invalid Circle After settings');
        }
        if (!this.checkCircleDuringSettings()) {
            throw new common_1.BadRequestException('Invalid Circle During settings');
        }
        return true;
    }
    checkScheduleSettings({ scheduleFrequencyPhoto, scheduleDurationPhoto, scheduleFramesQuantity }) {
        if (scheduleDurationPhoto > scheduleFrequencyPhoto * 30) {
            return false;
        }
        return scheduleFramesQuantity <= 25 * scheduleDurationPhoto;
    }
    checkMovementSettings({ movementChangeFrameTime, movementFrequencyAnalyzing }) {
        return movementFrequencyAnalyzing <= movementChangeFrameTime * 60;
    }
    checkCircleBeforeSettings({ circleDurationBeforeMoveSensor, circleFramesQuantityBeforeMove }) {
        return circleFramesQuantityBeforeMove <= circleDurationBeforeMoveSensor * 25;
    }
    checkCircleAfterSettings({ circleDurationAfterMoveSensor, circleFramesQuantityAfterMove }) {
        return circleFramesQuantityAfterMove <= circleDurationAfterMoveSensor * 25;
    }
    checkCircleDuringSettings() {
        return true;
    }
}
exports.DeviceSettingsValidationPipe = DeviceSettingsValidationPipe;
//# sourceMappingURL=device-settings-validation.pipe.js.map