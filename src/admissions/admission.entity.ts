import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Convention } from '../conventions/convention.entity';

@Entity()
export class Admission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  validFrom: Date;

  @Column()
  validTo: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  isPremium: boolean;

  @Column()
  isChild: boolean;

  @ManyToOne(() => Convention, (convention) => convention.admissions)
  @JoinColumn({ name: 'conventionId' })
  convention: Convention;

  @Column()
  conventionId: number;
}
