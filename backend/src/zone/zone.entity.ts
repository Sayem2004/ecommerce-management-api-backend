import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Deliveryman } from '../deliveryman/deliveryman.entity';

@Entity('zones')
export class Zone {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  zoneName!: string;

  @ManyToMany(() => Deliveryman, (deliveryman) => deliveryman.zones)
  deliveryman!: Deliveryman[];
}