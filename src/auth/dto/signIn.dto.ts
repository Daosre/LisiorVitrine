import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class SignInDto {
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
