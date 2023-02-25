import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { Status } from '../status.enum';
export declare class StatusValidationPipe implements PipeTransform {
    readonly allowedStatuses: Status[];
    transform(value: any, metadata: ArgumentMetadata): any;
    private isStatusValid;
}
