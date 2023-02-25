import {Module} from '@nestjs/common';
import {PacketsService} from './packets.service';
import {PacketsController} from './packets.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PacketsRepository} from './packets.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([PacketsRepository])
    ],
    providers: [PacketsService],
    controllers: [PacketsController],
    exports: [PacketsService]
})
export class PacketsModule {
}
