import { Injectable, NotFoundException } from '@nestjs/common';
import { AdminDto } from './dto/admin.dto';
export interface Admin {
  id: number;
  name: string;
  mail: string;
  username: string;
  password: string;
  createdAt: string;
  socialLink: string;
}
@Injectable()
export class AdminService {


  private admins: Admin[] = [
    {
      id: 1,
      name: 'sayem',
      mail: 'sayem@gmail.com',
      username: 'sayem-admin',
      password: '123@',
      createdAt: '2025-02-21',
      socialLink: 'https://facebook.com/sayem'
    },
    {
      id: 2,
      name: 'sakib',
      mail: 'sakib@gmail.com',
      username: 'sakib',
      password: '456@',
      createdAt: '2025-02-21',
      socialLink: 'https://facebook.com/sakib'
    },
  ];


  findAll(): Admin[] {
    return this.admins;
  }


  createAdmin(adminData: AdminDto) {

    const newId = this.admins.length > 0
      ? this.admins[this.admins.length - 1].id + 1
      : 1;

    const newAdmin: Admin = {
      id: newId,
      name: adminData.name,
      mail: adminData.mail,
      username: adminData.username,
      password: adminData.password,
      createdAt: adminData.createdAt,
      socialLink: adminData.socialLink,
    };

    this.admins.push(newAdmin);

    return { message: 'Admin created successfully', data: newAdmin };
  }


  searchAdmin(username: string) {
    const results = this.admins.filter(admin =>
      admin.username.toLowerCase().includes(username.toLowerCase())
    );
    return results;
  }


  deleteAdmin(id: number) {
    const index = this.admins.findIndex(admin => admin.id === id);

    if (index === -1) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }

    const deletedAdmin = this.admins[index];
    this.admins.splice(index, 1);

    return { message: 'Admin deleted successfully', data: deletedAdmin };
  }


  updateAdmin(id: number, data: Partial<AdminDto>) {
    const index = this.admins.findIndex(admin => admin.id === id);

    if (index === -1) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }


    this.admins[index] = { ...this.admins[index], ...data };

    return { message: 'Admin updated successfully', data: this.admins[index] };
  }


  getAllSellers() {
    return { message: 'Rohim,Korim' };
  }

  getAllCategories() {
    return { message: 'No-categoris' };
  }
}