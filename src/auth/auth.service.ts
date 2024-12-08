import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto, SignUpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signToken(
    userId: string,
    time: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      time: time,
    };

    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: time,
      secret: secret,
    });
    return {
      access_token: token,
    };
  }

  async signUp(dto: SignUpDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (existingUser) {
      throw new ForbiddenException("L'Email est déjà utiliser");
    }
    const hash = await argon.hash(dto.password);
    const activationToken = await argon.hash(`${new Date()} + ${dto.email}`);
    const newtToken = activationToken.replaceAll('/', '');
    const user = await this.prisma.user.create({
      data: {
        ...dto,
        password: hash,
        token: newtToken,
      },
    });
    return { message: 'Inscription Réussi' };
  }

  async signIn(dto: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    if (!user) {
      throw new ForbiddenException('Email Non Valide');
    }
    const isValidPassword = await argon.verify(user.password, dto.password);

    if (!isValidPassword) {
      throw new ForbiddenException('Mot de passe invalide');
    }
    return {
      token: await this.signToken(user.id, '30d'),
    };
  }
}
