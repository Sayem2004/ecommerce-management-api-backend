import { Controller,  Get,Post,Body, Query, Delete, Param, Put,  Patch,  ParseIntPipe } from "@nestjs/common";
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

  
  @Delete(':id')
  deleteAdmin(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteAdmin(id);
  }

  
  @Patch(':id')
  updateAdmin(@Param('id', ParseIntPipe) id: number, @Body() data: Partial<AdminDto>) {
    return this.adminService.updateAdmin(id, data);
  }

  
  @Put(':id')
  replaceAdmin(@Param('id', ParseIntPipe) id: number, @Body() data: AdminDto) {
    return this.adminService.updateAdmin(id, data);
  }

  @Get('sellers')
  getAllSellers() {
    return this.adminService.getAllSellers();
  }

  @Get('categories')
  getAllCategories() {
    return this.adminService.getAllCategories();
  }
}