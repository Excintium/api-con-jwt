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
type DurationString = `${number}${DurationUnit}`; // ej: "1d", "30m"

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      global: true,                 // <-- opcional, pero útil
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): JwtModuleOptions => {
        const raw = config.get<string>('JWT_EXPIRES') ?? '1d';

        let expiresIn: number | DurationString;
        if (/^\d+$/.test(raw)) {
          expiresIn = parseInt(raw, 10); // segundos
        } else {
          expiresIn = raw as DurationString; // "1d", "2h", etc.
        }

        const secret =
          config.get<string>('JWT_SECRET') ?? 'DEV_ONLY_SECRET_CHANGE_ME';
        console.log('JWT_SECRET en runtime:', secret);

        return {
          secret,
          signOptions: { expiresIn }, // <-- OJO: signOptions (con n)
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
