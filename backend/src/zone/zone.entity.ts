import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Deliveryman } from '../deliveryman/deliveryman.entity';

@Entity('zones')
export class Zone {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  zoneName!: string;   

  @ManyToMany(() => Deliveryman, (deliveryman) => deliveryman.zones)
  deliverymen!: Deliveryman[];
}