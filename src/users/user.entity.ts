import { Exclude } from 'class-transformer';
import { Entity } from 'typeorm';
import { PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Exclude()
  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  state?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  gender?: string;

  @Column('simple-array', { nullable: true })
  pronouns?: string;

  @Column({ nullable: true, type: 'text' })
  bio?: string;

  @Column('simple-array', { nullable: true })
  socials?: string;

  @Column({ nullable: true })
  image?: string;
}
