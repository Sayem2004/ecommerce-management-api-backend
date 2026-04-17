import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Deliveryman } from '../deliveryman/deliveryman.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Deliveryman])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}