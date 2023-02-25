import {IsString, IsNumber, IsArray, IsEnum, IsNotEmpty, Min, Max} from 'class-validator';
import {TimeUnit} from '../time-unit.enum';

export class CreateDeviceDto {
    @IsNotEmpty()
    @IsString()
    identifier: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    randomSymbols: string;

    @Min(1)
    @Max(86400)
    @IsNotEmpty()
    @IsNumber()
    scheduleFrequencyPhoto: number;

    @Min(1)
    @IsNotEmpty()
    @IsNumber()
    scheduleDurationPhoto: number;

    @Min(1)
    @IsNotEmpty()
    @IsNumber()
    scheduleFramesQuantity: number;

    @IsNotEmpty()
    @IsArray()
    movementCells: string[];

    @Min(1)
    @Max(100)
    @IsNotEmpty()
    @IsNumber()
    movementDiffLevel: number;

    @Min(1)
    @Max(1440)
    @IsNotEmpty()
    @IsNumber()
    movementChangeFrameTime: number;

    @Min(1)
    @Max(300)
    @IsNotEmpty()
    @IsNumber()
    movementFrequencyAnalyzing: number;

    @Min(0)
    @Max(3600)
    @IsNotEmpty()
    @IsNumber()
    circleDurationBeforeMoveSensor: number;

    @Min(0)
    @IsNotEmpty()
    @IsNumber()
    circleFramesQuantityBeforeMove: number;

    @IsNotEmpty()
    @IsEnum(TimeUnit)
    circleDurationDuringMoveSensorUnit: TimeUnit;

    @Min(1)
    @IsNotEmpty()
    @IsNumber()
    circleDurationDuringMoveSensor: number;

    @Min(1)
    @IsNotEmpty()
    @IsNumber()
    circleFramesQuantityDuringMove: number;

    @Min(0)
    @Max(3600)
    @IsNotEmpty()
    @IsNumber()
    circleDurationAfterMoveSensor: number;

    @Min(0)
    @IsNotEmpty()
    @IsNumber()
    circleFramesQuantityAfterMove: number;

}
