
import { getRepository } from 'typeorm';
import { Adress as AdressEntity } from '../../models/adress/adress.entity';
import { Adress } from '../../interfaces/adress/adress.interface';

export class AdressService {
    async create(adress: Adress): Promise<AdressEntity | Error>{
        const adressRepository = getRepository(AdressEntity);

        const result = await adressRepository.save(adress);

        if(!result) return new Error("Unable to create address")

        return result;

    }
    
    async updateFk(id: string, adress: Adress): Promise<AdressEntity | Error> {   
        const adressRepository = getRepository(AdressEntity); 

        const adressData = await adressRepository.findOne({ id: adress.id })

        const updateFk = {
            ...adressData,
            personId: id

        }

        const result = await adressRepository.save(updateFk)

        if(!result) return new Error("Unable to updateFk Adress")

        return result;
    }

    async findAll(id: string): Promise<AdressEntity[] | Error>{
        const adressRepository = getRepository(AdressEntity); 
        
        const findAdress = await adressRepository.find({ personId: id})

        if(!findAdress) return new Error("Adress not Exists!");

        return findAdress;
    }

    async findOne(params): Promise<AdressEntity | Error>{
        const adressRepository = getRepository(AdressEntity); 
        
        const findAdress = await adressRepository.findOne({ id: params.id})

        if(!findAdress) return new Error("Adress not Exists!");

        return findAdress;
    }

    async update(params, adress: Adress): Promise<AdressEntity |  Error>{
        const adressRepository = getRepository(AdressEntity); 

        const findAdress = await adressRepository.findOne({ id: params.id});

        if(!findAdress) return new Error("Adress not Exists!");

        const adressUpdate = {
            ...findAdress,
            ...adress
        }

         return adressRepository.save(adressUpdate);    
    }

    async remove(params): Promise<AdressEntity | Error>{
        const adressRepository = getRepository(AdressEntity); 

        const findAdress = await adressRepository.findOne({ id: params.id});

        if(!findAdress) return new Error("Adress not Exists!");

        return adressRepository.remove(findAdress);
    }
    
}