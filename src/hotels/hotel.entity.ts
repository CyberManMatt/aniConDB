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

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  address1: string;

  @Column({ nullable: true })
  address2?: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false, length: 2 })
  state: string;

  @Column({ nullable: false, length: 5 })
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
