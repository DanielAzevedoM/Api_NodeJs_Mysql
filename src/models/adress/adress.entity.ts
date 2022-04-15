import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Person } from '../person/person.entity';

@Entity()
export class Adress {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  adress: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  postalCode: number;

  @Column()
  country: string;

  @JoinColumn()
  @ManyToOne(type => Person, adress => Adress)
  person: Person

  @Column({ nullable: true})
  personId: string;

 
}
