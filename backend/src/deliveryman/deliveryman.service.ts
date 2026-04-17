import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Deliveryman } from './deliveryman.entity';
import { DeliverymanDTO } from './deliveryman.dto';
import { Zone } from '../zone/zone.entity';
import { Order } from '../order/order.entity';


@Injectable()
export class DeliverymanService {
  constructor(
    @InjectRepository(Deliveryman)
    private readonly dmRepo: Repository<Deliveryman>,

    @InjectRepository(Zone)
    private readonly zoneRepo: Repository<Zone>,

    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

     private mailerService: MailerService,
  ) {}

  getAll() {
    return this.dmRepo.find({ relations: ['zones', 'orders'] });
  }

  async getById(id: string) {
    const data = await this.dmRepo.findOne({
      where: { id },
      relations: ['zones', 'orders'],
    });

    if (!data) throw new NotFoundException('Deliveryman not found');
    
    return data;
  }

 async create(info: DeliverymanDTO) {
  const hashedPassword = await bcrypt.hash(info.password, 10);

  const dm = this.dmRepo.create({
    ...info,
    password: hashedPassword,
  });

   const saved = await this.dmRepo.save(dm);

  await this.mailerService.sendMail({
    to: info.email,
    subject: 'Welcome to Delivery System',
    text: `Hello ${info.fullName}, your account has been created successfully.`,
  });


  return this.dmRepo.save(dm);
}

  async update(id: string, info: DeliverymanDTO) {
    const dm = await this.getById(id);
    Object.assign(dm, info);
    return this.dmRepo.save(dm);
  }

  async updatePhone(id: string, phone: number) {
    const dm = await this.getById(id);
    dm.phone = phone;
    return this.dmRepo.save(dm);
  }

  async remove(id: string) {
    const dm = await this.getById(id);
    return this.dmRepo.remove(dm);
  }

  async getNullFullName() {
    return this.dmRepo.find({ where: { fullName: IsNull() } });
  }

  async assignZone(deliverymanId: string, zoneId: number) {
    const dm = await this.getById(deliverymanId);

    const zone = await this.zoneRepo.findOne({ where: { id: zoneId } });
    if (!zone) throw new NotFoundException('Zone not found');

    if (!dm.zones) dm.zones = [];

    dm.zones.push(zone);

    return this.dmRepo.save(dm);
  }

  async removeZone(deliverymanId: string, zoneId: number) {
    const dm = await this.getById(deliverymanId);

    if (!dm.zones || dm.zones.length === 0) {
      return { message: 'No zones assigned' };
    }

    dm.zones = dm.zones.filter(zone => zone.id !== zoneId);

    return this.dmRepo.save(dm);
  }

  // 10. CREATE ORDER (One-to-Many)
  async createOrder(deliverymanId: string, orderData: any) {
    const dm = await this.getById(deliverymanId);

    const order = this.orderRepo.create({
      ...orderData,
      deliveryman: dm,
    });

    return this.orderRepo.save(order);
  }

  async getOrdersByDeliveryman(deliverymanId: string) {
    const dm = await this.getById(deliverymanId);

    return this.orderRepo.find({
      where: { deliveryman: { id: dm.id } },
    });
    
  }
}
