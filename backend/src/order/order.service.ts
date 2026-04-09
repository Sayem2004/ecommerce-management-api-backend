import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { Deliveryman } from '../deliveryman/deliveryman.entity';
import { OrderDTO } from './order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,

    @InjectRepository(Deliveryman)
    private deliverymanRepo: Repository<Deliveryman>,
  ) {}

  async createOrder(deliverymanId: string, info: OrderDTO) {
    const deliveryman = await this.deliverymanRepo.findOne({
      where: { id: deliverymanId },
    });

    if (!deliveryman) {
      throw new NotFoundException('Deliveryman not found');
    }

    const order = this.orderRepo.create({
      ...info,
      deliveryman,
    });

    return await this.orderRepo.save(order);
  }

  async getOrdersByDeliveryman(deliverymanId: string) {
    return await this.orderRepo.find({
      where: {
        deliveryman: { id: deliverymanId },
      },
      relations: ['deliveryman'],
    });
  }
}