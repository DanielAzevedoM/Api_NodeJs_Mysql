import { getRepository } from 'typeorm';
import { Person as PersonEntity } from '../../models/person/person.entity'; 
import { Person } from '../../interfaces/person/person.interface';
import { User as UserEntity} from '../../models/user/user.entity';
import { UpdatePerson } from '../../interfaces/person/person.update.interface';


export class PersonService {
  	async create(param, person: Person): Promise<PersonEntity | Error>{
        const userRepository = getRepository(UserEntity);

        const personRepository = getRepository(PersonEntity);

        const findUser = await userRepository.findOne(param.userId);

        if(!findUser) return new Error("User not Exists")

		return personRepository.save(person)
    }  

    async updateFk(id: string, person: Person): Promise<UserEntity | Error>{
        const userRepository = getRepository(UserEntity);

		const findUser = await userRepository.findOne(id)

		if(!findUser) return new Error("User nots Exists!");

		const userUpdate = {
			...findUser,
			person: person,
		
		}

		return userRepository.save(userUpdate);    
    }

    async remove(params): Promise<PersonEntity | Error>{
        const userRepository = getRepository(UserEntity);

        const personRepository = getRepository(PersonEntity);

		const findUser = await userRepository.findOne(params.userId);
       
		const findPerson = await personRepository.findOne(findUser.personId);

		if(findPerson.id !== findUser.personId) return new Error("Person not Exists!");
		if(!findUser) return new Error("User not exists!");
		if(!findPerson) return new Error("Person not exists!");

		const userUpdate = {
			...findUser,
			personId: null
		}

		await userRepository.save(userUpdate);

		return personRepository.remove(findPerson)
	}

	async findOne(params): Promise<PersonEntity | Error>{

        
        const userRepository = getRepository(UserEntity);

        const personRepository = getRepository(PersonEntity);

		const findUser = await userRepository.findOne(params.userId);

		const findPerson = await personRepository.findOne(findUser.personId);

		if(findPerson.id !== findUser.personId) return new Error("Person id not exists in User!");
		if(!findUser) return new Error("User not exists!");
		if(!findPerson) return new Error("Person not exists!");
	
		return findPerson;
	}

	async update(params, person: UpdatePerson): Promise<PersonEntity | Error>{
        const userRepository = getRepository(UserEntity);

        const personRepository = getRepository(PersonEntity);

		const findUser = await userRepository.findOne(params.userId);

		const findPerson = await personRepository.findOne(findUser.personId);

		if(findPerson.id !== findUser.personId) return new Error("Person id not exists in User!");
		if(!findUser) return new Error("User not exists!");
		if(!findPerson) return new Error("Person not exists!");

        const personUpdate = {
            ...findPerson,
            name: person.newName,
            gender: person.newGender,
			birthday: person.newBirthday
        }

         return personRepository.save(personUpdate);    
    }
	

}
