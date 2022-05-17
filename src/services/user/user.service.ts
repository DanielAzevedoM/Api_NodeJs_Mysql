import { getRepository,  } from 'typeorm';
import { User as UserEntity} from '../../models/user/user.entity';
import { encondePassword } from '../../utils/bcrypt';
import { User } from '../../interfaces/user/user.interface';


export class UserService { 
     async findAll(): Promise<UserEntity[]> {    
        const userRepository =  getRepository(UserEntity)

        let result = await userRepository.find({ isDeleted: false })

        for(let user of result){
            delete user.password
        }

        return result
    }

    async findOne(id: string): Promise<UserEntity | Error>{
        const userRepository =  getRepository(UserEntity)

        const findUser = await userRepository.findOne({id});

        if(!findUser) return new Error("User not exists");

        delete findUser.password;
        
        return findUser;
    }

    async update( id: string,  user: User): Promise<UserEntity | Error>{
        const userRepository =  getRepository(UserEntity);
     
        const findUser = await userRepository.findOne({id});

        const checkUserExists = await userRepository.findOne({email: user.email})

        if(!findUser) return new Error("User not exists");
        
        if(checkUserExists) return new Error("Email already exits!");

        const passwordEncoded = await encondePassword(user.password);

        const userUpdate = {
            ...findUser,
            email: user.email,
            password: passwordEncoded
        }

        const result = await userRepository.save(userUpdate);    

        delete result.password;

        return result;
    }

    async remove(id: string): Promise<UserEntity | Error>{
        const userRepository =  getRepository(UserEntity);

        const findUser = await userRepository.findOne({ id });

        if(!findUser) return new Error("User not exists");

        const userDeleted = {
            ...findUser,
            isDeleted: true
        }

        return userRepository.save(userDeleted);
    }
}