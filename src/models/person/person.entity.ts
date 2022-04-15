import { Column, Entity, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Adress } from '../adress/adress.entity';
import { User } from '../user/user.entity';


@Entity()
export class Person {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  birthday: Date;

  @Column({ nullable: true})
  selfie: string;

  @OneToOne(type => User, person => Person)
  user: User;

  @OneToMany(type => Adress, person => Person)
  adress: Adress;
 
}
