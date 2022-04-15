
import { getRepository } from 'typeorm';
import { Adress as AdressEntity } from '../../models/adress/adress.entity';
import { User as UserEntity } from '../../models/user/user.entity';
import { Person as PersonEntity } from '../../models/person/person.entity';
import { Adress } from '../../interfaces/adress/adress.interface';
import { UpdateAdress } from '../../interfaces/adress/adress.update.interface';




export class AdressService {
    async create(params, adress: Adress): Promise<AdressEntity | Error>{
        const userRepository = getRepository(UserEntity);

        const personRepository = getRepository(PersonEntity);

        const adressRepository = getRepository(AdressEntity);

        const findUser = await userRepository.findOne(params.userId);

        const findPerson = await personRepository.findOne(findUser.personId);
        
        if(findUser.personId !== findPerson.id) return new Error("Person not exists!");
       	if(!findUser) return new Error("User not exists!");
		if(!findPerson) return new Error("Person not Exists!");


        return adressRepository.save(adress);
    }
    
    async updateFk(params, adress: Adress): Promise<AdressEntity> {   
        const userRepository = getRepository(UserEntity);

        const personRepository = getRepository(PersonEntity);

        const adressRepository = getRepository(AdressEntity); 

        const findUser = await userRepository.findOne(params.userId);

        const findPerson = await personRepository.findOne(findUser.personId);

        const updateFk = {
            ...adress,
            personId: findPerson.id

        }

        return adressRepository.save(updateFk)
    }

    async findAll(params): Promise<AdressEntity[] | Error>{
        const userRepository = getRepository(UserEntity);

        const personRepository = getRepository(PersonEntity);

        const adressRepository = getRepository(AdressEntity); 
        
        const findUser = await userRepository.findOne(params.userId)
       
        const findPerson = await personRepository.findOne(findUser.personId)

        const findAdress = await adressRepository.find()
   
     
        if(findUser.personId !== findPerson.id) return new Error("Person not exists!");
        if(!findUser) return new Error("User not exists!");
        if(!findPerson) return new Error("Person not Exists!");
        if(!findAdress) return new Error("Adress not Exists!");

        return findAdress;
    }

    async findOne(params): Promise<AdressEntity | Error>{
        const userRepository = getRepository(UserEntity);

        const personRepository = getRepository(PersonEntity);

        const adressRepository = getRepository(AdressEntity); 

        const findUser = await userRepository.findOne(params.userId)

        const findPerson = await personRepository.findOne(findUser.personId)

        const findAdress = await adressRepository.findOne(params.id)

        if(findUser.personId !== findPerson.id) return new Error("Person not exists!");
        if(!findUser) return new Error("User not exists!");
        if(!findPerson) return new Error("Person not Exists!");
        if(!findAdress) return new Error("Adress not Exists!");

        return findAdress;
    }

    async update(params, adress: UpdateAdress): Promise<AdressEntity |  Error>{
        const userRepository = getRepository(UserEntity);

        const personRepository = getRepository(PersonEntity);

        const adressRepository = getRepository(AdressEntity); 

        const findUser = await userRepository.findOne(params.userId);

        const findPerson = await personRepository.findOne(findUser.personId);

        const findAdress = await adressRepository.findOne(params.id);

        if(findUser.personId !== findPerson.id) return new Error("Person not exists!");
        if(!findUser) return new Error("User not exists!");
        if(!findPerson) return new Error("Person not Exists!");
        if(!findAdress) return new Error("Adress not Exists!");

        const adressUpdate = {
            ...findAdress,
            adress: adress.newAdress,
            city: adress.newCity,
            state: adress.newState,
            postalCode: adress.newPostalCode,
            country: adress.newCountry,
        }

         return adressRepository.save(adressUpdate);    
    }

    async remove(params): Promise<AdressEntity | Error>{

        const userRepository = getRepository(UserEntity);

        const personRepository = getRepository(PersonEntity);

        const adressRepository = getRepository(AdressEntity); 
      
        const findUser = await userRepository.findOne(params.userId);

        const findPerson = await personRepository.findOne(findUser.personId);

        const findAdress = await adressRepository.findOne(params.id);

        if(findUser.personId !== findPerson.id) return new Error("Person not exists!");
        if(!findUser) return new Error("User not exists!");
        if(!findPerson) return new Error("Person not Exists!");
        if(!findAdress) return new Error("Adress not Exists!");

        return adressRepository.remove(findAdress);
    }


    
}