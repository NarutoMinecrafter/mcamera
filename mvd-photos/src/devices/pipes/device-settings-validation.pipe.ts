import {ArgumentMetadata, BadRequestException, PipeTransform} from '@nestjs/common';
import {CreateDeviceDto} from '../dto/create-device.dto';

export class DeviceSettingsValidationPipe implements PipeTransform {

    transform(createDeviceDto: CreateDeviceDto, metadata: ArgumentMetadata): any {
        if (!this.isSettingsValid(createDeviceDto)) {
            throw new BadRequestException('invalid settings');
        }
        return createDeviceDto;
    }

    private isSettingsValid(createDeviceDto: CreateDeviceDto) {
        if (!this.checkScheduleSettings(createDeviceDto)) {
            throw new BadRequestException('Invalid schedule settings');
        }
        if (!this.checkMovementSettings(createDeviceDto)) {
            throw new BadRequestException('Invalid Movement settings');
        }
        if (!this.checkCircleBeforeSettings(createDeviceDto)) {
            throw new BadRequestException('Invalid Circle Before settings');
        }
        if (!this.checkCircleAfterSettings(createDeviceDto)) {
            throw new BadRequestException('Invalid Circle After settings');
        }
        if (!this.checkCircleDuringSettings()) {
            throw new BadRequestException('Invalid Circle During settings');
        }
        return true;
    }

    private checkScheduleSettings(
        {scheduleFrequencyPhoto, scheduleDurationPhoto, scheduleFramesQuantity}: CreateDeviceDto
    ) {
        if (scheduleDurationPhoto > scheduleFrequencyPhoto * 30) {
            return false;
        }
        return scheduleFramesQuantity <= 25 * scheduleDurationPhoto;
    }

    private checkMovementSettings(
        {movementChangeFrameTime, movementFrequencyAnalyzing}: CreateDeviceDto
    ) {
        return movementFrequencyAnalyzing <= movementChangeFrameTime * 60;
    }

    private checkCircleBeforeSettings(
        {circleDurationBeforeMoveSensor, circleFramesQuantityBeforeMove}: CreateDeviceDto
    ) {
        return circleFramesQuantityBeforeMove <= circleDurationBeforeMoveSensor * 25;
    }

    private checkCircleAfterSettings(
        {circleDurationAfterMoveSensor, circleFramesQuantityAfterMove}: CreateDeviceDto
    ) {
        return circleFramesQuantityAfterMove <= circleDurationAfterMoveSensor * 25;
    }

    private checkCircleDuringSettings() {
        return true;
    }
}