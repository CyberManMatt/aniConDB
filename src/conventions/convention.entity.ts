import { Admission } from 'src/admissions/admission.entity';
import { Venue } from 'src/venues/venue.entity';
import { Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Hotel } from '../hotels/hotel.entity';
import { Vendor } from 'src/vendors/vendor.entity';

@Entity()
export class Convention {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: true })
  image_alt?: string;

  @Column({ nullable: false, type: 'date' })
  startDate: Date;

  @Column({ nullable: false, type: 'date' })
  endDate: Date;

  @Column({ nullable: true })
  webpage?: string;

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

  @Exclude()
  @ManyToMany(() => Vendor, (vendor) => vendor.conventions, { eager: true })
  vendors: Vendor[];

  // Additional properties and methods can be added as needed
}
