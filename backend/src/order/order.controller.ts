import { Controller, Post, Get, Param, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDTO } from './order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Post('create/:deliverymanId')
  @UsePipes(new ValidationPipe())
  createOrder(
    @Param('deliverymanId') deliverymanId: string,
    @Body() info: OrderDTO,
  ) {
    return this.service.createOrder(deliverymanId, info);
  }

  @Get('deliveryman/:deliverymanId')
  getOrdersByDeliveryman(@Param('deliverymanId') deliverymanId: string) {
    return this.service.getOrdersByDeliveryman(deliverymanId);
  }
}