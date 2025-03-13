import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserServices } from './services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CONNECTION_NAME, DB_COLLECTION_NAME } from 'src/_constant/database.constant';

import { UniqueSchema } from 'src/_schema/unique.schema';
import { CommonService } from 'src/_common/common.service';
import { UserSchema } from 'src/_schema/user.shcema';
import { AuthMiddleware } from 'src/_middlewares/auth.middleware';
import { DocumentController } from './controllers/document.controller';
import { DocumentService } from './services/document.service';
import { DocumentSchema } from 'src/_schema/document.schema';


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
        },
        {
            name:DB_COLLECTION_NAME.document,
            schema:DocumentSchema
        }
      ],
      CONNECTION_NAME,
    ),
  ],
  controllers: [UserController , DocumentController],
  providers: [UserServices,CommonService , DocumentService],
  exports: [UserServices,CommonService , DocumentService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({path:'login',method:RequestMethod.POST})
      .forRoutes(UserController,DocumentController);
  }
}
