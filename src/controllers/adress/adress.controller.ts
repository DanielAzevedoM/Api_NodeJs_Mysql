import { Request, Response } from "express";
import { AdressService } from '../../services/adress/adress.service';

const adressService = new AdressService()

export class AdressController {
    async create(request: Request, response: Response){
        const adress = request.body;
 
        const createAdress = await adressService.create(adress);

        if(createAdress instanceof Error) return response.status(400).json(createAdress.message);

        const result =  await adressService.updateFk(request.personId, createAdress);

        return response.json(result);
    }

    async findAll(request: Request, response: Response) {
        const result = await adressService.findAll(request.personId);

        if(result instanceof Error) return response.status(400).json(result.message);

        return response.json(result)
    }

   
    async findOne(request: Request, response: Response) {
        const params = request.params;

        const result = await adressService.findOne(params);

        if(result instanceof Error) return response.status(400).json(result.message);

        return response.json(result)
    }

    async update(request: Request, response: Response) {
        const params = request.params;

        const adress = request.body;

        const result = await adressService.update(params, adress)

       return response.json(result)
    }


    async remove(request: Request, response: Response) {
        const params = request.params;

        const result = await adressService.remove(params)

        return response.json(result)
    }

}