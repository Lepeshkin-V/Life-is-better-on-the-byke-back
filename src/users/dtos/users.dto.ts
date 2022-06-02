import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'login', description: 'Логин' })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({ example: 'password', description: 'Пароль' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
