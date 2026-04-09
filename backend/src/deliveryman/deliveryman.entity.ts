import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  Check,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Order } from '../order/order.entity';
import { Zone } from '../zone/zone.entity';

@Entity('deliveryman')
@Check(`"phone" >= 0`)
export class Deliveryman {
  @PrimaryColumn()
  id!: string;

  @BeforeInsert()
  generateId() {
    this.id = 'DM' + Math.floor(Math.random() * 10000);
  }

  @Column({ default: true })
  active!: boolean;

  @Column({ type: 'varchar', nullable: true })
  fullName!: string | null;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  gender!: string;

  @Column({ type: 'bigint' })
  phone!: number;

  @Column()
  area!: string;

  @Column()
  status!: string;

  // One deliveryman can have many orders
  @OneToMany(() => Order, (order) => order.deliveryman)
  orders!: Order[];

  // One deliveryman can work in many zones
  @ManyToMany(() => Zone, (zone) => zone.deliveryman, { cascade: true })
  @JoinTable()
  zones!: Zone[];
}