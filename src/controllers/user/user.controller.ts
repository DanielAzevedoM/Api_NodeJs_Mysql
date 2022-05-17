import { Request, Response } from "express";
import { UserService } from "../../services/user/user.service";

const userService = new UserService();

class UserController {

    async findAll(request: Request, response: Response){
        const result = await userService.findAll();

        return response.json(result);
    }

    async findOne(request: Request, response: Response){
        const result = await userService.findOne(request.id);

        if(result instanceof Error) return response.status(400).json(result.message);
    
        return response.json(result);
    }

    async update(request: Request, response: Response){
        const user = request.body;
        
        const result = await userService.update(request.id, user)

        if(result instanceof Error) return response.status(400).json(result.message);

        return response.json(result)
    }

    async remove(request: Request, response: Response){
        const result = await userService.remove(request.id);
        
        if(result instanceof Error) return response.status(400).json(result.message);

        return response.json(result)
    }
     
}

export { UserController }