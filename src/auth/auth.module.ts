// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './guard/auth.guard';

type DurationUnit = 'ms' | 's' | 'm' | 'h' | 'd' | 'w' | 'y';
type DurationString = `${number}${DurationUnit}`; // <- "1d", "30m", etc.

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): JwtModuleOptions => {
        const raw = config.get<string>('JWT_EXPIRES') ?? '1d';

        let expiresIn: number | DurationString;
        if (/^\d+$/.test(raw)) {
          // solo dígitos => segundos como number
          expiresIn = parseInt(raw, 10);
        } else {
          // forzamos a template-literal válido (1d, 2h, 30m, etc.)
          expiresIn = raw as DurationString;
        }

        return {
          secret:
            config.get<string>('JWT_SECRET') ?? 'DEV_ONLY_SECRET_CHANGE_ME',
          signOptions: { expiresIn }, // ahora coincide con el tipo esperado
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
