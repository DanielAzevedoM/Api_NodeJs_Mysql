import { IsEmail, IsOptional } from "class-validator";


//Falta fazer validação de email.
export class UpdateUserDto {

    id:string;
    
    @IsOptional()
    @IsEmail()
    newEmail: string;
  
    newPassword: string;

}