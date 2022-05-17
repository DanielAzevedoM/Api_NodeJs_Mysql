import { Request, response, Response } from 'express';

import { AuthService } from '../../services/auth/auth.service';

const authService = new AuthService();

export class AuthController {

    async authenticate(req: Request, res: Response){
        const { email, password } = req.body;

        const validateUser = await authService.validateUser(email, password)

        if(validateUser instanceof Error) return response.status(400).json(validateUser.message);
   
        const result = await authService.login(validateUser)
       
        return res.json(result)
      
    }


    async create(request: Request, response: Response){
        const user = request.body;

        const result = await authService.create(user);

        if(result instanceof Error) return response.status(400).json(result.message);
    
        return response.json(result);

    }

    async changePassword(request: Request, response: Response){
        const { newPassword } = request.body;

        await authService.updatePassword(request.email, newPassword)

        return response.json({ message: "Password Updated"})
    }
}
