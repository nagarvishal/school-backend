import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  MongooseModuleAsyncOptions,
  MongooseModuleFactoryOptions,
} from '@nestjs/mongoose';
import { Connection, MongooseError } from 'mongoose';
import { CONNECTION_NAME } from 'src/_constant/database.constant';



export const MongooseConfig: MongooseModuleAsyncOptions = {
  connectionName: CONNECTION_NAME,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (
    configService: ConfigService,
  ): MongooseModuleFactoryOptions => ({
    uri: configService.get('MONGODB_URI'),
    dbName: configService.get('MONGODB_DATABASE'),
    minPoolSize: 4,
    maxPoolSize: 20,
    retryWrites: true,
    readConcern: { level: 'local' },
    readPreference: 'nearest',
    writeConcern: { w: 'majority' },
    connectionFactory: (connection: Connection) => {
      connection.on('connecting', () => {
        console.log('MongoDB connecting');
      });
      connection.on('connected', () => {
        console.log('Mongodb connected');
      });
      connection.on('disconnecting', () => {
        console.log('Mongodb disconnecting');
      });
      connection.on('disconnected', () => {
        console.log('Mongodb disconnected');
      });

      return connection;
    },
    connectionErrorFactory: (error: MongooseError) => {
      console.log(error, 'Mongodb connection error');
      return error;
    },
  }),
};
