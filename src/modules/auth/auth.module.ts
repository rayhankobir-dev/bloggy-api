import { AuthenticationGuardProvider } from './provider/authentication-guard.provider';
import { RefreshTokenRepository } from './refresh-token.repository';
import { EncryptionModule } from '../encryption/encryption.module';
import { AuthController } from './auth.controller';
import { jwtConfig } from 'src/config/jwt.config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import {
  RefreshToken,
  RefreshTokenSchema,
} from './entities/refresh-token.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]),
    JwtModule.registerAsync(jwtConfig),
    ConfigModule,
    UserModule,
    EncryptionModule,
  ],
  controllers: [AuthController],
  providers: [AuthenticationGuardProvider, AuthService, RefreshTokenRepository],
})
export class AuthModule {}
