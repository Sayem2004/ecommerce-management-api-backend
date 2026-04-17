import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  Controller, Get, Post, Put, Patch, Delete,
  Param, Body, UsePipes, ValidationPipe
} from '@nestjs/common';
import { DeliverymanService } from './deliveryman.service';
import { DeliverymanDTO } from './deliveryman.dto';

@UseGuards(JwtAuthGuard)
@Controller('deliveryman')
export class DeliverymanController {
  constructor(private readonly service: DeliverymanService) {}

  @Get('listall')
  getAll() {
    return this.service.getAll();
    
  }

  @Get('getbyid/:id')
  async getById(@Param('id') id: string) {
    const data=await  this.service.getById(id);
    const {gender,area,phone,status,email,password, ...rest}=data;
    return rest;
  }
  

  @Post('create')
  @UsePipes(new ValidationPipe())
  create(@Body() info: DeliverymanDTO) {
    return this.service.create(info);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() info: DeliverymanDTO) {
    return this.service.update(id, info);
  }

  @Patch('update-phone/:id')
  updatePhone(@Param('id') id: string, @Body('phone') phone: number) {
    return this.service.updatePhone(id, phone);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Get('null-fullName')
  getNullFullName() {
    return this.service.getNullFullName();
  }

  @Post('assign-zone')
  assignZone(
    @Body('deliverymanId') deliverymanId: string,
    @Body('zoneId') zoneId: number,
  ) {
    return this.service.assignZone(deliverymanId, zoneId);
  }
 
  @Delete('remove-zone/:deliverymanId/:zoneId')
  removeZone(
    @Param('deliverymanId') deliverymanId: string,
    @Param('zoneId', ParseIntPipe) zoneId: number,
  ) {
    return this.service.removeZone(deliverymanId, zoneId);
  }
}
