import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deliveryman } from './deliveryman.entity';
import { Zone } from '../zone/zone.entity';
import { Order } from '../order/order.entity';

import { DeliverymanController } from './deliveryman.controller';
import { DeliverymanService } from './deliveryman.service';

@Module({
  imports: [TypeOrmModule.forFeature([Deliveryman, Zone, Order])],
  controllers: [DeliverymanController],
  providers: [DeliverymanService],
})
export class DeliverymanModule {}