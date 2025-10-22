import { IsEmail, IsPhoneNumber, IsTaxId } from 'class-validator';

export class createUserDto {
  firstName: string;
  lastName: string;

  @IsEmail()
  email: string;

  password: string;

  @IsPhoneNumber('BR')
  cellphone: string;

  @IsTaxId('pt-BR')
  taxId: string;
}
