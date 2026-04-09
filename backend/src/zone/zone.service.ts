import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Zone } from './zone.entity';
import { Deliveryman } from '../deliveryman/deliveryman.entity';
import { ZoneDTO } from './zone.dto';

@Injectable()
export class ZoneService {
  constructor(
    @InjectRepository(Zone)
    private zoneRepo: Repository<Zone>,

    @InjectRepository(Deliveryman)
    private deliverymanRepo: Repository<Deliveryman>,
  ) {}

  async assignZone(deliverymanId: string, info: ZoneDTO) {
    const deliveryman = await this.deliverymanRepo.findOne({
      where: { id: deliverymanId },
      relations: ['zones'],
    });

    if (!deliveryman) {
      throw new NotFoundException('Deliveryman not found');
    }

    let zone = await this.zoneRepo.findOne({
      where: { zoneName: info.zoneName },
    });

    if (!zone) {
      zone = this.zoneRepo.create(info);
      zone = await this.zoneRepo.save(zone);
    }

    deliveryman.zones.push(zone);

    await this.deliverymanRepo.save(deliveryman);

    return {
      message: 'Zone assigned successfully',
      deliverymanId,
      zone,
    };
  }
}