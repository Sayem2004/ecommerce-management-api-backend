import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
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

  @ManyToOne(() => Deliveryman, (deliveryman) => deliveryman.orders, {
    onDelete: 'CASCADE',
  })
  deliveryman!: Deliveryman;
}