
import { getRepository, Repository } from 'typeorm';
import { User as UserEntity} from '../../models/user/user.entity';
import { User } from '../../interfaces/user/user.interface';
import { UpdateUser } from '../../interfaces/user/user.update.interface'



export class UserService { 
    async create(user: User): Promise<UserEntity| Error>{
        const userRepository =  getRepository(UserEntity)
        
        const checkUserExists = await userRepository.findOne({email: user.email})
        
        if(checkUserExists) return new Error("Email already exits!")
        
        return  userRepository.save(user);

    }
    
    async findAll(): Promise<UserEntity[]> {    
        const userRepository =  getRepository(UserEntity)

        return userRepository.find()
    }

    async findOne(id: string): Promise<UserEntity | Error>{
        const userRepository =  getRepository(UserEntity)

        const findUser = await userRepository.findOne(id);

        if(!findUser) return new Error("User not exists");
        
        return findUser;
    }

    async update(id: string, user:  UpdateUser): Promise<UserEntity | Error>{
        const userRepository =  getRepository(UserEntity);
     
        const findUser = await userRepository.findOne(id);

        if(!findUser) return new Error("User not exists");

        const userUpdate = {
            ...findUser,
            email: user.newEmail,
            password: user.newPassword
        }

         return userRepository.save(userUpdate);    
    }

    async remove(id: string): Promise<UserEntity | Error>{
        const userRepository =  getRepository(UserEntity);

        const findUser = await userRepository.findOne(id);

        if(!findUser) return new Error("User not exists");

        return userRepository.remove(findUser);
    }
}