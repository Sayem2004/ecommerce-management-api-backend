import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deliveryman } from './deliveryman.entity';
import { DeliverymanDTO } from './deliveryman.dto';
import { IsNull } from 'typeorm';

@Injectable()
export class DeliverymanService {
  constructor(
    @InjectRepository(Deliveryman)
    private repo: Repository<Deliveryman>,
  ) {}

  // Create a deliveryman
  async create(info: DeliverymanDTO) {
    const deliveryman = this.repo.create(info);
    return await this.repo.save(deliveryman);
  }

  // List all deliverymen
  async getAll() {
    return await this.repo.find();
  }

  // Get by ID
  async getById(id: string) {
    return await this.repo.findOne({ where: { id } });
  }

  // Get by ID and fullName (optional)
  async getByIdAndName(id: string, fullName?: string) {
    if (fullName) {
      return await this.repo.findOne({ where: { id, fullName } });
    } else {
      return await this.repo.findOne({ where: { id } });
    }
  }

  // Update all info
  async update(id: string, info: DeliverymanDTO) {
    await this.repo.update(id, info);
    return { message: 'Updated', id, data: info };
  }

  // Update status only
  async updateStatus(id: string, status: string) {
    await this.repo.update(id, { status });
    return { message: 'Status Updated', id, status };
  }

  // Update phone only
  async updatePhone(id: string, phone: number) {
    await this.repo.update(id, { phone });
    return { message: 'Phone Updated', id, phone };
  }

  // Delete deliveryman
  async remove(id: string) {
    await this.repo.delete(id);
    return { message: 'Deleted', id };
  }

  // Search by area
  async search(area: string) {
    return await this.repo.find({ where: { area } });
  }

  // Get deliverymen with null fullName
  async getNullFullName() {
    return await this.repo.find({ where: { fullName: IsNull() } });
  }
}