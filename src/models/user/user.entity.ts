import { Column, Entity, JoinColumn, ObjectID, ObjectIdColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Person } from '../person/person.entity';


@Entity() 
export class User  {


  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  email: string

  @Column()
  password: string;

  @JoinColumn()
  @OneToOne(type => Person, user => User)
  person: Person;

  @Column({ nullable: true })
  personId: string;
}
