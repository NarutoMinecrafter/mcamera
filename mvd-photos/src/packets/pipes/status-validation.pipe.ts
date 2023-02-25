import {ArgumentMetadata, BadRequestException, PipeTransform} from '@nestjs/common';
import {Status} from '../status.enum';

export class StatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        Status.NONE,
        Status.SENDING,
        Status.TO_SEND,
    ]


    transform(value: any, metadata: ArgumentMetadata): any {
        value = value.toUpperCase();
        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}" is an invalid status`)
        }

        return value;
    }

    private isStatusValid(status: any) {
        const index = this.allowedStatuses.indexOf(status);
        return index !== -1;
    }
}