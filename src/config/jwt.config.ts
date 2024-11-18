import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const jwtConfig: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<JwtModuleOptions> => {
    return {
      secret: configService.get<string>(
        'JWT_SECRET',
        'ACOMPLEXSECRETANDKEEPITSAFE',
      ),
      signOptions: { expiresIn: '1d' },
      global: true,
    };
  },
};
