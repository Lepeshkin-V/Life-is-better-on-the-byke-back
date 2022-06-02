import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class AuthDto {
  @ApiProperty({ example: 'login', description: 'Login' })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({ example: 'password', description: 'Password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class AuthResponse {
  @ApiProperty({ description: 'token' })
  jwtToken: string;

  @ApiProperty()
  user: User;
}
