import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AdminDto } from './dto/admin.dto';
import { Admin } from './admin.entity';

@Injectable()
export class AdminService {

  constructor(
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,
  ) {}


  async findAll() {
    const admins = await this.adminRepo.find();
    

    return {
      message: "All admins fetched successfully",
      data: admins
    };
  }

  async createAdmin(adminData: AdminDto) {

    const admin = this.adminRepo.create(adminData);

    const savedAdmin = await this.adminRepo.save(admin);

    return {
      message: "Admin created successfully",
      data: savedAdmin
    };
  }

  async searchAdmin(username: string) {

    const results = await this.adminRepo.find({
      where: { username }
    });

    return {
      message: "Search result",
      data: results
    };
  }


  async deleteAdmin(id: number) {

    const admin = await this.adminRepo.findOne({
      where: { id }
    });

    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }

    await this.adminRepo.remove(admin);

    return {
      message: "Admin deleted successfully",
      data: admin
    };
  }


  async updateAdmin(id: number, data: Partial<AdminDto>) {

    const admin = await this.adminRepo.findOne({
      where: { id }
    });

    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }

    Object.assign(admin, data);

    const updatedAdmin = await this.adminRepo.save(admin);

    return {
      message: "Admin updated successfully",
      data: updatedAdmin
    };
  }

  getAllSellers() {
    return {
      message: "Rohim, Korim"
    };
  }

  
  getAllCategories() {
    return {
      message: "No categories"
    };
  }

  
  // User Category 4 Functions
 

 
  async createUser() {

    const user = this.adminRepo.create();

    const savedUser = await this.adminRepo.save(user);

    return {
      message: "User created successfully",
      data: savedUser
    };
  }

  
  async updateCountry(id: number, country: string) {

    const user = await this.adminRepo.findOne({
      where: { id }
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    user.country = country;

    const updatedUser = await this.adminRepo.save(user);

    return {
      message: "Country updated successfully",
      data: updatedUser
    };
  }


  async findByJoiningDate(date: string) {

    const users = await this.adminRepo.find({
      where: { joiningDate: new Date(date) }
    });

    return {
      message: "Users by joining date",
      data: users
    };
  }

 
  async findDefaultCountry() {

    const users = await this.adminRepo.find({
      where: { country: 'Unknown' }
    });

    return {
      message: "Users with default country",
      data: users
    };
  }

}