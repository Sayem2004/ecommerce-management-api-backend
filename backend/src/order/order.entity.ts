import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Deliveryman } from '../deliveryman/deliveryman.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  productName!: string;

  @Column()
  customerName!: string;

  @Column()
  status!: string;

  @ManyToOne(() => Deliveryman, (deliveryman) => deliveryman.orders)
  deliveryman!: Deliveryman;
}