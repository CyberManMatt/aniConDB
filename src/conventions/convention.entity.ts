import { Admission } from 'src/admissions/admission.entity';
import { Venue } from 'src/venues/venue.entity';
import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { PrimaryGeneratedColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Hotel } from '../hotels/hotel.entity';

@Entity()
export class Convention {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  image_alt: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ nullable: true })
  webpage: string;

  @ManyToOne(() => Venue, (venue) => venue.conventions)
  @JoinColumn({ name: 'venueId' })
  venue: Venue;

  @Column()
  venueId: number;

  @Exclude()
  @OneToMany(() => Admission, (admission) => admission.convention, {
    eager: true,
  })
  admissions: Admission[];

  @Exclude()
  @ManyToMany(() => Hotel, (hotel) => hotel.conventions, { eager: true })
  hotels: Hotel[];

  // Additional properties and methods can be added as needed
}
