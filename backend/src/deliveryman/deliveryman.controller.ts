import { Controller, Get, Post, Patch, Put, Delete, Param, Body, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { DeliverymanService } from './deliveryman.service';
import { DeliverymanDTO } from './deliveryman.dto';

@Controller('deliveryman')
export class DeliverymanController {
  constructor(private readonly service: DeliverymanService) {}

  // List all deliverymen
  @Get('listall')
  getAll() {
    return this.service.getAll();
  }

  // Get deliveryman by ID
  @Get('getbyid/:id')
  getById(@Param('id') id: string) {
    return this.service.getById(id);
  }

  // Optional: Get by ID and Full Name
  @Get('getbyidandfullname')
  getByIdAndFullName(@Query('id') id: string, @Query('fullname') fullName: string) {
    return this.service.getByIdAndName(id, fullName);
  }

  // Create a deliveryman
  @Post('create')
  @UsePipes(new ValidationPipe())
  create(@Body() info: DeliverymanDTO) {
    return this.service.create(info);
  }

  // Update all info
  @Put('update/:id')
  update(@Param('id') id: string, @Body() info: DeliverymanDTO) {
    return this.service.update(id, info);
  }

  // Update status only
  @Patch('updatestatus/:id')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.service.updateStatus(id, status);
  }

  // Update phone only
  @Patch('update-phone/:id')
  updatePhone(@Param('id') id: string, @Body('phone') phone: number) {
    return this.service.updatePhone(id, phone);
  }

  // Delete deliveryman
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  // Search by area
  @Get('search')
  search(@Query('area') area: string) {
    return this.service.search(area);
  }

  // Get deliverymen with null fullName
  @Get('null-fullName')
  getNullFullName() {
    return this.service.getNullFullName();
  }
}