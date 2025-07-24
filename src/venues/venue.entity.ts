import { Entity } from 'typeorm';
import { PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Venue {
  // Define properties of the Venue entity here
  // For example, id, name, location, etc.

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address1: string;

  @Column()
  address2: string;

  @Column()
  city: string;

  @Column()
  stateProv: string;

  @Column()
  zip: string;

  @Column()
  country: string;

  @Column()
  phone: string;

  @Column()
  website: string;

  @Column()
  foodCourt: boolean;
}
