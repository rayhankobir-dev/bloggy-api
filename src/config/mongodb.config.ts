import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  MongooseModuleAsyncOptions,
  MongooseModuleOptions,
} from '@nestjs/mongoose';

export const mongooseConfig: MongooseModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<MongooseModuleOptions> => {
    const DATABASE_NAME = 'blogsdb';
    const mongoUri = configService.getOrThrow<string>('MONGO_URI');

    return {
      uri: `${mongoUri}/${DATABASE_NAME}`,
      connectionFactory: (connection) => {
        const logger = new Logger('MongooseConnection');

        connection.once('open', () => {
          logger.log(
            `Successfully connected to the database: ${DATABASE_NAME}`,
          );
        });

        connection.on('error', (error) => {
          logger.error(`Database connection error:`, error);
        });
        return connection;
      },
    };
  },
};
