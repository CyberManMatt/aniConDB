import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Convention } from '../conventions/convention.entity';

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address1: string;

  @Column({ nullable: true })
  address2: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zip: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  image_alt: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  conBlock: boolean;

  @Column()
  reservationDeadline: Date;

  @Column({ nullable: true })
  reservationPage: string;

  @ManyToMany(() => Convention, (convention) => convention.hotels)
  @JoinTable()
  conventions: Convention[];
}
