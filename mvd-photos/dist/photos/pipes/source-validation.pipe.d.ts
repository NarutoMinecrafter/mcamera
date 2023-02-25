import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { Source } from '../source.enum';
export declare class SourceValidationPipe implements PipeTransform {
    readonly allowedStatuses: Source[];
    transform(value: any, metadata: ArgumentMetadata): any;
    private isSourceValid;
}
