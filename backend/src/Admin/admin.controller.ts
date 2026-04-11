import {
  Controller, Get, Post, Body, Query,
  Delete, Param, Put, Patch, ParseIntPipe
} from "@nestjs/common";

import { AdminDto } from "./dto/admin.dto";
import { AdminService } from "./admin.service";

@Controller('admin')
export class AdminController {

  constructor(private readonly adminService: AdminService) {}

  @Get()
  getAll() {
    return this.adminService.findAll();
  }

  @Post()
  createAdmin(@Body() adminData: AdminDto) {
    return this.adminService.createAdmin(adminData);
  }

  @Get('search')
  searchAdmin(@Query('username') username: string) {
    return this.adminService.searchAdmin(username);
  }

  @Get('date')
  findByDate(@Query('date') date: string) {
    return this.adminService.findByJoiningDate(date);
  }

  @Get('country/default')
  findDefaultCountry() {
    return this.adminService.findDefaultCountry();
  }

  @Get('sellers')
  getAllSellers() {
    return this.adminService.getAllSellers();
  }

  @Get('categories')
  getAllCategories() {
    return this.adminService.getAllCategories();
  }

  @Post('create-user')
  createUser(@Body() data: AdminDto) {
    return this.adminService.createUser(data);
  }

  @Patch(':id/country')
  updateCountry(
    @Param('id', ParseIntPipe) id: number,
    @Body('country') country: string
  ) {
    return this.adminService.updateCountry(id, country);
  }

  @Patch(':id')
  updateAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<AdminDto>
  ) {
    return this.adminService.updateAdmin(id, data);
  }

  @Put(':id')
  replaceAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: AdminDto
  ) {
    return this.adminService.updateAdmin(id, data);
  }

  @Delete(':id')
  deleteAdmin(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteAdmin(id);
  }

  // ⚠️ MUST BE LAST
  @Get(':id')
  getAdminById(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getAdminById(id);
  }
}