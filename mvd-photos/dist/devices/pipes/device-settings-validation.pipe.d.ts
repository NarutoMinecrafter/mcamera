import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { CreateDeviceDto } from '../dto/create-device.dto';
export declare class DeviceSettingsValidationPipe implements PipeTransform {
    transform(createDeviceDto: CreateDeviceDto, metadata: ArgumentMetadata): any;
    private isSettingsValid;
    private checkScheduleSettings;
    private checkMovementSettings;
    private checkCircleBeforeSettings;
    private checkCircleAfterSettings;
    private checkCircleDuringSettings;
}
