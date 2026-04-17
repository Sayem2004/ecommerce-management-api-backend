import { Controller, Post, Body, Get, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { ZoneService } from './zone.service';
import { ZoneDTO } from './zone.dto';

@Controller('zone')
export class ZoneController {
  constructor(private readonly service: ZoneService) {}

  //  CREATE
  @Post('create')
  @UsePipes(new ValidationPipe())
  create(@Body() dto: ZoneDTO) {
    return this.service.create(dto);
  }

  @Get('listall')
  getAll() {
    return this.service.getAll();
  }

  @Get('getbyid/:id')
  getById(@Param('id') id: number) {
    return this.service.getById(id);
  }
}