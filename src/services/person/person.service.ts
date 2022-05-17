import { getRepository } from 'typeorm';
import { Person as PersonEntity } from '../../models/person/person.entity'; 
import { Person } from '../../interfaces/person/person.interface';
import { User as UserEntity} from '../../models/user/user.entity';



export class PersonService {
  	async create(person: Person): Promise<PersonEntity | Error>{
        const personRepository = getRepository(PersonEntity);

		return personRepository.save(person)
    }  

    async updateFk(id: string, person: Person): Promise<Person | Error>{
        const userRepository = getRepository(UserEntity);

		const findUser = await userRepository.findOne({ id: id});

		if(!findUser) return new Error("User nots Exists!");

		const userUpdate = {
			...findUser,
			personId: person.id,
		
		}
		
		await userRepository.save(userUpdate);    

		return person;
    }

    async remove(id: string): Promise<PersonEntity | Error>{
		const personRepository = getRepository(PersonEntity)

		const userRepository = getRepository(UserEntity);

		const findUser = await userRepository.findOne({ personId: id});
		
		if(findUser.personId !== null){

			const findPerson = await personRepository.findOne({ id })

			const userUpdate = {
				...findUser,
				personId: null
			}

			await userRepository.save(userUpdate);

			return personRepository.remove(findPerson)
			
		} else {
			 return new Error("Person not exists!");
		}
	}

	async findOne(id: string): Promise<PersonEntity | Error>{
		const personRepository = getRepository(PersonEntity);

		const findPerson = await personRepository.findOne({ id });

		if(!findPerson) return new Error("Person not exists!");
	
		return findPerson;
	}

	async update(id: string, person: Person): Promise<PersonEntity | Error>{
        const personRepository = getRepository(PersonEntity);

		const findPerson = await personRepository.findOne({ id });

		if(!findPerson) return new Error("Person not exists!");

        const personUpdate = {
            ...findPerson,
            ...person
        }

         return personRepository.save(personUpdate);    
    }

	async updateSelfie(id: string, selfie: string): Promise<PersonEntity | Error >{
        const personRepository = getRepository(PersonEntity);

		const findPerson = await personRepository.findOne({ id });

		if(!findPerson) return new Error("Person not exists!");

		const updateSelfie = {
			...findPerson,
			selfie: selfie
		}

		return personRepository.save(updateSelfie)
	}
	
	

}
