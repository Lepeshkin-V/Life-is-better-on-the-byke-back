import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDto, AuthResponse } from 'src/auth/auth.dto';
import { AuthService } from 'src/auth/services/auth.service';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register'})
  @ApiBody({ type: AuthDto })
  @ApiResponse({ status: 200, type: AuthResponse })
  @Post('signUp')
  async signUp(@Body() input: AuthDto): Promise<AuthResponse> {
    return this.authService.signUp(input);
  }

  @ApiOperation({ summary: 'Login'})
  @ApiBody({ type: AuthDto })
  @ApiResponse({ status: 200, type: AuthResponse })
  @Post('signIn')
  async signIn(@Body() input: AuthDto): Promise<AuthResponse> {
    return this.authService.signIn(input);
  }
}
