import { getRepository } from 'typeorm';
import { Person as PersonEntity } from '../../models/person/person.entity'; 
import { Person } from '../../interfaces/person/person.interface';
import { User as UserEntity} from '../../models/user/user.entity';
import { Adress } from '../../models/adress/adress.entity';



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

	async findByLocation(id:string, location: { city: string, state: string}): Promise<Adress[] | Error>{
		const adressRepository = getRepository(Adress)

		const result = await adressRepository.find({ personId: id,  ...location })

		if(!result) return new Error("Location not found")

		return result;
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
