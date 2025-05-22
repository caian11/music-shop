import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, senha: string) {
    const user = await this.usuarioService.findByEmail(email, {
      withPassword: true,
    });
    if (!user) throw new UnauthorizedException('Credenciais inválidas.');

    const valid = await bcrypt.compare(senha, user.senha);
    if (!valid) throw new UnauthorizedException('Credenciais inválidas.');

    const { senha: _, ...result } = user;
    return result;
  }

  login(user: { id: number; email: string }) {
    const payload = { sub: user.id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}
