import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZoneController } from './zone.controller';
import { ZoneService } from './zone.service';
import { Zone } from './zone.entity';
import { Deliveryman } from '../deliveryman/deliveryman.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Zone, Deliveryman])],
  controllers: [ZoneController],
  providers: [ZoneService],
})
export class ZoneModule {}