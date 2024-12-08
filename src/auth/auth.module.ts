import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from './strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports : [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService,PrismaService,JwtStrategy,JwtService],
})
export class AuthModule {}
