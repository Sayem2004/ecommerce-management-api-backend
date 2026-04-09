import { IsNotEmpty, IsIn } from 'class-validator';

export class OrderDTO {
  @IsNotEmpty()
  productName!: string;

  @IsNotEmpty()
  customerName!: string;

  @IsIn(['pending', 'delivered'])
  status!: string;
}