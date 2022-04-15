import { Request, Response } from "express";
import { CreateUserDto } from "../../dtos/user/user.dto";
import { PersonService } from "../../services/person/person.service";


const personService = new PersonService();

class PersonController {
    async create(request: Request, response: Response){
        const person = request.body;

        const params = request.params;

        await personService.remove(params)

        const createPerson = await personService.create(params, person);

        if(createPerson instanceof Error) return response.status(400).json(createPerson.message);

        const result = await personService.updateFk(params.userId, createPerson)

        return response.json(result);
    }


    async findOne(request: Request, response: Response){
        const params = request.params;

        const result = await personService.findOne(params);

        if(result instanceof Error) return response.status(400).json(result.message);
    
        return response.json(result);
    }

    async update(request: Request, response: Response){
        const person = request.body;

        const params = request.params;
        
        const result = await personService.update(params, person)

        if(result instanceof Error) return response.status(400).json(result.message);

        return response.json(result)
    }

    async remove(request: Request, response: Response){
        const params = request.params;

        const result = await personService.remove(params);
        
        if(result instanceof Error) return response.status(400).json(result.message);

        return response.json(result)
    }
     
}

export { PersonController }