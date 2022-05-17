import { Request, Response } from "express";
import { PersonService } from "../../services/person/person.service";


const personService = new PersonService();

class PersonController {
    async create(request: Request, response: Response){
        const person = request.body;

        await personService.remove(request.personId)

        const createPerson = await personService.create(person);

        if(createPerson instanceof Error) return response.status(400).json(createPerson.message);

        const result = await personService.updateFk(request.id, createPerson)

        return response.json(result);
    }


    async findOne(request: Request, response: Response){
        const result = await personService.findOne(request.personId);

        if(result instanceof Error) return response.status(400).json(result.message);
    
        return response.json(result);
    }

    async findByLocation(request: Request, response: Response){
        const location = request.body

        const result = await personService.findByLocation(request.personId, location);

        if(result instanceof Error) return response.status(400).json(result.message);
    
        return response.json(result);
    }

    async update(request: Request, response: Response){
        const person = request.body;

        const result = await personService.update(request.personId, person)

        if(result instanceof Error) return response.status(400).json(result.message);

        return response.json(result)
    }

    async remove(request: Request, response: Response){
      
        const result = await personService.remove(request.personId);
        
        if(result instanceof Error) return response.status(400).json(result.message);

        return response.json(result)
    }

    async updateSelfie(request, response: Response){
        const file = request.file;

        const result = await personService.updateSelfie(request.personId , file.path)

        return response.json(result);
    }
     
}

export { PersonController }