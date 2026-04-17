import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './order.entity';
import { Deliveryman } from '../deliveryman/deliveryman.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private repo: Repository<Order>,

    @InjectRepository(Deliveryman)
    private dmRepo: Repository<Deliveryman>,
  ) {}

  async create(deliverymanId: string, body: any) {
    const dm = await this.dmRepo.findOne({
      where: { id: deliverymanId },
    });

    const order = this.repo.create({
      ...body,
      deliveryman: dm!,
    });

    return this.repo.save(order);
  }
  getByDeliveryman(id: string) {
    return this.repo.find({
      where: { deliveryman: { id } },
      relations: ['deliveryman'],
    });
  }
async update(orderId: number, body: any) {
  return this.repo.update(orderId, body);
}

}