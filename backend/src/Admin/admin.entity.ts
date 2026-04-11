import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert
} from 'typeorm';

import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Admin {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  mail!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  socialLink!: string;

  @CreateDateColumn()
  joiningDate!: Date;

  @Column({ default: 'Unknown' })
  country!: string;

  @Column({ length: 150 })
  uniqueId!: string;

  @BeforeInsert()
  generateUUID() {
    this.uniqueId = uuidv4();
  }
}