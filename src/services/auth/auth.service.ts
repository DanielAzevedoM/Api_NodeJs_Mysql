import { getRepository } from 'typeorm';
import { User as UserEntity } from '../../models/user/user.entity';
import jwt from 'jsonwebtoken'
import { comparePasswords, encondePassword } from '../../utils/bcrypt';
import { User } from '../../interfaces/user/user.interface';



export class AuthService { 
   
	async validateUser(email: string, password: string): Promise<any | Error> {
		try {
            const userRepository = getRepository(UserEntity);

			const user = await userRepository.findOne({ email });
            
			try {

				const match = comparePasswords(password, user.password);
        
				if (match) {
					const { password, ...result } = user;
                    
					return result.email
					
				} 
                
			} catch {

				return new Error('The password does not match')
			}
		}
		catch {

			return new Error('User does not exists!')
		}
	}
    
    async login(email: string): Promise<any | Error>{

        const repository = getRepository(UserEntity);

        const user = await repository.findOne({ email });

        if(!user) return new Error("User not exists");

        const payload ={ email: user.email, id: user.id, personId: user.personId }

        delete user.password;

        return {
            acess_token: jwt.sign(payload, 'secret', {expiresIn: '7d'})
        }
    }

    async create(user: User): Promise<UserEntity| Error>{
        const userRepository =  getRepository(UserEntity)
        
        const checkUserExists = await userRepository.findOne({email: user.email})
        
        if(checkUserExists) return new Error("Email already exits!")

        const password = await encondePassword(user.password)

        const result = await userRepository.save({...user, password});

        delete result.password
   
        return  result;
    }

    async updatePassword(email: string, newPassword: string): Promise<UserEntity | Error >{
			const userRepository = getRepository(UserEntity)

			const findUser = await userRepository.findOne({ email });

			const password = await encondePassword(newPassword);

            const result = {
                ...findUser,
                password: password
            }

            return  userRepository.save(result)
    } 
		
}
    

    
