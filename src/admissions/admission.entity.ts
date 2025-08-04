import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
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

  @Column()
  price: number;

  @ManyToOne(() => Convention, (convention) => convention.admissions)
  convention: Convention;

  @Column()
  isPremium: boolean;

  @Column()
  isChild: boolean;
}
