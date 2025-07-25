import { Venue } from 'src/venues/venue.entity';
import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { PrimaryGeneratedColumn, Column } from 'typeorm';

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

    @OneToOne(() => Venue, { eager: true })
    @JoinColumn()
    venue: Venue;

  // Additional properties and methods can be added as needed
}