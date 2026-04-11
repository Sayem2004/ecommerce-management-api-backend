import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ILike } from 'typeorm';

import { AdminDto } from './dto/admin.dto';
import { Admin } from './admin.entity';

@Injectable()
export class AdminService {

  constructor(
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,
  ) { }

  private removePassword(admin: Admin) {
    const { password, ...rest } = admin;
    return rest;
  }

  async findAll() {
    const admins = await this.adminRepo.find();

    return {
      message: "All admins fetched successfully",
      data: admins.map(admin => this.removePassword(admin))
    };
  }

  async getAdminById(id: number) {
    const admin = await this.adminRepo.findOne({ where: { id } });

    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }

    return {
      message: "Admin fetched successfully",
      data: this.removePassword(admin)
    };
  }


  async searchAdmin(username: string) {
    const results = await this.adminRepo.find({
      where: {
        username: ILike(`%${username}%`)
      }
    });

    return {
      message: "Search result",
      data: results.map(admin => this.removePassword(admin))
    };
  }

  async createAdmin(adminData: AdminDto) {
    const admin = this.adminRepo.create(adminData);
    const savedAdmin = await this.adminRepo.save(admin);

    return {
      message: "Admin created successfully",
      data: this.removePassword(savedAdmin)
    };
  }

  // async searchAdmin(username: string) {
  //   const results = await this.adminRepo.find({
  //     where: { username }
  //   });

  //   return {
  //     message: "Search result",
  //     data: results.map(admin => this.removePassword(admin))
  //   };
  // }

  async deleteAdmin(id: number) {
    const admin = await this.adminRepo.findOne({ where: { id } });

    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }

    await this.adminRepo.remove(admin);

    return {
      message: "Admin deleted successfully",
      data: this.removePassword(admin)
    };
  }

  async updateAdmin(id: number, data: Partial<AdminDto>) {
    const admin = await this.adminRepo.findOne({ where: { id } });

    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }

    Object.assign(admin, data);

    const updatedAdmin = await this.adminRepo.save(admin);

    return {
      message: "Admin updated successfully",
      data: this.removePassword(updatedAdmin)
    };
  }

  getAllSellers() {
    return { message: "Rohim, Korim" };
  }

  getAllCategories() {
    return { message: "No categories" };
  }

  async createUser(adminData: AdminDto) {
    const user = this.adminRepo.create(adminData);
    const savedUser = await this.adminRepo.save(user);

    return {
      message: "User created successfully",
      data: this.removePassword(savedUser)
    };
  }

  async updateCountry(id: number, country: string) {
    const user = await this.adminRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    user.country = country;

    const updatedUser = await this.adminRepo.save(user);

    return {
      message: "Country updated successfully",
      data: this.removePassword(updatedUser)
    };
  }

  async findByJoiningDate(date: string) {
    const user = await this.adminRepo
      .createQueryBuilder("admin")
      .where("DATE(admin.joiningDate) = :date", { date })
      .getOne(); 

    if (!user) {
      return {
        message: "No user found for this date",
        data: null
      };
    }

    const { password, ...rest } = user;

    return {
      message: "Admin fetched successfully",
      data: rest
    };
  }
  async findDefaultCountry() {
    const users = await this.adminRepo.find({
      where: { country: 'Unknown' }
    });

    return {
      message: "Users with default country",
      data: users.map(user => this.removePassword(user))
    };
  }
}