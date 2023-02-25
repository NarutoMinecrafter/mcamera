import { BaseEntity } from 'typeorm';
import { Packet } from '../packets/packet.entity';
import { TimeUnit } from './time-unit.enum';
import { Photo } from '../photos/photo.entity';
import { UserGroups } from '../user-groups/user-groups.entity';
export declare class Device extends BaseEntity {
    id: number;
    identifier: string;
    name: string;
    battery: number;
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
    userGroups: UserGroups;
    userGroupsId: number;
    packet: Packet;
    photo: Photo;
}
