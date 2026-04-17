import { IsNotEmpty } from 'class-validator';

export class OrderDTO {
  @IsNotEmpty()
  productName!: string;

  @IsNotEmpty()
  customerName!: string;

  @IsNotEmpty()
  status!: string;
}