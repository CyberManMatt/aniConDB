import { Convention } from 'src/conventions/convention.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  address1?: string;

  @Column({ nullable: true })
  address2?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true, length: 2 })
  state?: string;

  @Column({ nullable: true, length: 5 })
  zip?: string;

  @Column({ nullable: true, length: 10 })
  phone?: string;

  @Column({ nullable: true })
  website?: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: true })
  image_alt?: string;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  @ManyToMany(() => Convention, (convention) => convention.vendors)
  @JoinTable()
  conventions: Convention[];
}
