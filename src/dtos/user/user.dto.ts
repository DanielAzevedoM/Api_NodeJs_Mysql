import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
     
    id: string;
    
    
    @IsEmail({}, { message: 'Invalid email'})
    email: string

    //@Exclude({ toPlainOnly: true })
    @IsNotEmpty({ message: 'Password required'})
    password: string;
      
}



