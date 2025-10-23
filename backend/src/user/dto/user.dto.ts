import { Transform } from 'class-transformer';
import { IsEmail, IsPhoneNumber, Matches } from 'class-validator';

export class CreateUserDto {
  firstName: string;
  lastName: string;

  @IsEmail()
  email: string;

  password: string;

  @IsPhoneNumber('BR')
  cellphone: string;

  @Transform(({ value }) => value?.replace(/\D/g, ''))
  @Matches(/^\d{11}$|^\d{14}$/, {
    message: 'taxId deve ser um CPF (11 dígitos) ou CNPJ (14 dígitos) válido',
  })
  taxId: string;
}
