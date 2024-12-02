import { ConfigModule, ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import {
  ThrottlerAsyncOptions,
  ThrottlerModuleOptions,
} from '@nestjs/throttler';

export const throttlerConfig: ThrottlerAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<ThrottlerModuleOptions> => {
    const logger = new Logger('ThrottlerConfig');

    const ttl = configService.get<number>('THROTTLE_TTL', 60); // Default 60 seconds
    const limit = configService.get<number>('THROTTLE_LIMIT', 10); // Default 10 requests

    logger.log(`Throttle configured: ${limit} requests per ${ttl} seconds`);

    return {
      throttlers: [
        {
          ttl,
          limit,
        },
      ],
      errorMessage: 'Too many requests. Please try again later.',
    };
  },
};
