import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserServices } from './services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CONNECTION_NAME, DB_COLLECTION_NAME } from 'src/_constant/database.constant';

import { UniqueSchema } from 'src/_schema/unique.schema';
import { CommonService } from 'src/_common/common.service';
import { UserSchema } from 'src/_schema/user.shcema';
import { AuthMiddleware } from 'src/_middlewares/auth.middleware';


@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: DB_COLLECTION_NAME.users,
          schema: UserSchema,
        },
        {
          name:DB_COLLECTION_NAME.unique,
          schema:UniqueSchema
        }
      ],
      CONNECTION_NAME,
    ),
  ],
  controllers: [UserController],
  providers: [UserServices,CommonService],
  exports: [UserServices,CommonService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({path:'login',method:RequestMethod.POST})
      .forRoutes(UserController);
  }
}
