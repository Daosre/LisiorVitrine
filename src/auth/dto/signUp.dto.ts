import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  identifiant: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @MaxLength(320)
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @MaxLength(255)
  password: string;
}
