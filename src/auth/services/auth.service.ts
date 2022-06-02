import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse, AuthDto } from '../auth.dto';
import * as crypto from 'crypto';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(dto: AuthDto): Promise<AuthResponse> {

    const isUserAlreadyExists = await this.usersService.getCountByLogin(dto.login);

    if (isUserAlreadyExists>0) {
      throw new ForbiddenException('login already exists');
    }

    const user = await this.usersService.create(dto);

    
    const jwtToken = await this.jwtService.signAsync({ id: user.id });
    return { jwtToken, user } as AuthResponse;
  }

  async signIn(dto: AuthDto): Promise<AuthResponse> {
    const password = crypto.createHmac('sha256', dto.password).digest('hex');
    const user = await this.usersService.getByLoginAndPassword(dto.login, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const jwtToken = await this.jwtService.signAsync({ id: user.id });
    return { jwtToken, user } as AuthResponse;
  }
}
