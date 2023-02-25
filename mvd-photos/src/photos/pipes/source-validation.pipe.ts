import {ArgumentMetadata, BadRequestException, PipeTransform} from '@nestjs/common';
import {Source} from '../source.enum';

export class SourceValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        Source.BeforeMotion,
        Source.MotionDetected,
        Source.Scheduled,
        Source.EndOfMotion,
    ]

    transform(value: any, metadata: ArgumentMetadata): any {
        if (!this.isSourceValid(value)) {
            throw new BadRequestException(`"${value}" is an invalid source`)
        }

        return value;
    }

    private isSourceValid(status: any) {
        const index = this.allowedStatuses.indexOf(status);
        return index !== -1;
    }
}