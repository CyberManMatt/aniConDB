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

  @Column({ type: 'date', nullable: false })
  validFrom: Date;

  @Column({ type: 'date', nullable: false })
  validTo: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: false, nullable: false, type: 'boolean' })
  isPremium: boolean;

  @Column({ default: false, nullable: false, type: 'boolean' })
  isChild: boolean;

  @ManyToOne(() => Convention, (convention) => convention.admissions)
  @JoinColumn({ name: 'conventionId' })
  convention: Convention;

  @Column()
  conventionId: number;
}
