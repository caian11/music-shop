import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email', // nome do campo de usuário
      passwordField: 'senha', // nome do campo de senha
    });
  }

  async validate(email: string, senha: string) {
    return this.authService.validateUser(email, senha);
  }
}
