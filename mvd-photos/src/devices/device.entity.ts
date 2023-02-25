import {BaseEntity, Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique} from 'typeorm';
import {Packet} from '../packets/packet.entity';
import {TimeUnit} from './time-unit.enum';
import {Photo} from '../photos/photo.entity';
import {UserGroups} from '../user-groups/user-groups.entity';


@Entity()
@Unique(['identifier'])
export class Device extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    identifier: string;

    @Column()
    name: string;

    @Column({nullable: true})
    battery: number;

    @Column()
    randomSymbols: string;

    // Settings by schedule
    @Column()
    scheduleFrequencyPhoto: number; // (m) 1 - 1440     1.1

    @Column()
    scheduleDurationPhoto: number; // (s) 1s - 30 * frequencyPhoto     1.2

    @Column()
    scheduleFramesQuantity: number; // (s/m) 1 - 25 / 1 - 1500      1.3

    // Settings of Movement Sensor
    @Column('varchar', {array: true})
    movementCells: string[]; // 1 - 100     2.1

    @Column()
    movementDiffLevel: number; // (%) 1 - 100       2.2

    @Column()
    movementChangeFrameTime: number; // (m) 1 - 1440        2.3

    @Column()
    movementFrequencyAnalyzing: number; // (m) 0 - 300      2.4

    // Settings of Circle Frames Buffer
    @Column()
    circleDurationBeforeMoveSensor: number; // (s) 1 - 3600    2.5.1

    @Column()
    circleFramesQuantityBeforeMove: number; // (s/m) 1 - 25 / 1 - 1500     2.5.2

    @Column()
    circleDurationDuringMoveSensorUnit: TimeUnit; // (s) 1 - 3600    2.5.3 (a)

    @Column()
    circleDurationDuringMoveSensor: number; // (s/m) 1 - 3600 / 1 - 1440;   2.5.3 (b)

    @Column()
    circleFramesQuantityDuringMove: number; // (s/m) 1 - 25 * 2.5.3 / 1 - 25*60*2.5.3     2.5.4

    @Column()
    circleDurationAfterMoveSensor: number; // (s) 1 - 3600    2.5.5

    @Column()
    circleFramesQuantityAfterMove: number; // (s) 1 - 25 * 2.5.5    2.5.6


    @ManyToOne(() => UserGroups, userGroup => userGroup.devices, {eager: false, onDelete: 'CASCADE'})
    userGroups: UserGroups;

    @Column()
    userGroupsId: number;

    @OneToOne(() => Packet, packet => packet.device, {eager: false, onDelete: 'CASCADE'})
    packet: Packet;

    @OneToMany(() => Photo, photo => photo.device, {eager: false, onDelete: 'CASCADE'})
    photo: Photo;
}
