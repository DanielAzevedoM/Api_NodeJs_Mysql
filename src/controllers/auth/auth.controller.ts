import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken'

import { User } from '../../models/user/user.entity';

export class AuthController {
    async authenticate(req: Request, res: Response){
        const repository = getRepository(User);
        const { email, password} = req.body;

        const user = await repository.findOne({ email: email, password: password});

        if(!user){
            return res.sendStatus(401)
        }

        const token = jwt.sign({ id: user.id }, 'secret', {expiresIn: '7d'})

        delete user.password;

        return res.json({ user, token})
    }
}
