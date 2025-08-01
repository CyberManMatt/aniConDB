import { Entity } from 'typeorm';
import { PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  gender: string;

  @Column('simple-array', { nullable: true })
  pronouns: string;

  @Column({ nullable: true })
  bio: string;

  @Column('simple-array', { nullable: true })
  socials: string;

  @Column({ nullable: true })
  image: string;
}
