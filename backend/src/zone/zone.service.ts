import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Zone } from './zone.entity';

@Injectable()
export class ZoneService {
  constructor(
    @InjectRepository(Zone)
    private repo: Repository<Zone>,
  ) {}

  
  create(dto: any) {
    const zone = this.repo.create(dto);
    return this.repo.save(zone);
  }

  
  getAll() {
    return this.repo.find({ relations: ['deliverymen'] });
  }

  getById(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['deliverymen'],
    });
  }
}