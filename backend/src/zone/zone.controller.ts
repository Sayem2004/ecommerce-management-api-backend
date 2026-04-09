import { Controller, Post, Param, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { ZoneService } from './zone.service';
import { ZoneDTO } from './zone.dto';

@Controller('zone')
export class ZoneController {
  constructor(private readonly service: ZoneService) {}

  @Post('assign/:deliverymanId')
  @UsePipes(new ValidationPipe())
  assignZone(
    @Param('deliverymanId') deliverymanId: string,
    @Body() info: ZoneDTO,
  ) {
    return this.service.assignZone(deliverymanId, info);
  }
}