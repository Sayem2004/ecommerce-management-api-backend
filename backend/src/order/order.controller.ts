import {
  Controller,
  Post,
  Get,
  Put,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDTO } from './order.dto';

@Controller('order')
export class OrderController {
  constructor(private service: OrderService) {}

  @Post('create/:deliverymanId')
  @UsePipes(new ValidationPipe())
  create(
    @Param('deliverymanId') id: string,
    @Body() body: OrderDTO,
  ) {
    return this.service.create(id, body);
  }

  @Get('deliveryman/:id')
  get(@Param('id') id: string) {
    return this.service.getByDeliveryman(id);
  }

  @Put('update/:orderId')
update(
  @Param('orderId') orderId: number,
  @Body() body: OrderDTO,
) {
  return this.service.update(orderId, body);
}
}