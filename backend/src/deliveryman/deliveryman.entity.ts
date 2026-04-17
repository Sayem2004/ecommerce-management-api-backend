import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Zone } from '../zone/zone.entity';
import { Order } from '../order/order.entity';

@Entity('deliveryman')
export class Deliveryman {
  @PrimaryColumn()
  id!: string;

  @BeforeInsert()
  generateId() {
    this.id = 'DM' + Math.floor(Math.random() * 10000);
  }

  @Column({ nullable: true })
  fullName!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

 @Column()
  gender!: string;

  @Column()
  phone!: number;

  @Column()
  area!: string;

  @Column()
  status!: string;
 
  @OneToMany(() => Order, (order) => order.deliveryman)
  orders!: Order[];

  @ManyToMany(() => Zone, (zone) => zone.deliverymen, { cascade: true })
  @JoinTable()
  zones!: Zone[];
}