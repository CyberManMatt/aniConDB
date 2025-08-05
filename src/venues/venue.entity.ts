import { Convention } from 'src/conventions/convention.entity';
import { Entity, OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Venue {
  // Define properties of the Venue entity here,
  // For example, id, name, location, etc.

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
  foodCourt: boolean;

  @OneToMany(() => Convention, (convention) => convention.venue, {
    eager: true,
  })
  conventions: Convention[];
}
