import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfig } from './_database/mongodb.config';
import { UserModule } from './user/user.module';
import { CommonService } from './_common/common.service';
import { AuthModule } from './auth/auth.module';
import { JwtConfigModule } from './_jwt/jwt.module';
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { HttpExceptionFilter } from './_request_handler/exception.filter';
import { ResponseInterceptor } from './_request_handler/response.interceptor';
import { AuthMiddleware } from './_middlewares/auth.middleware';
import { CurriculumModule } from './curriculum/curriculum.module';
import { EmailModule } from './_email/email.module';
import { AssesmentModule } from './exam/assesment.module';
import { AwsModule } from './_aws/aws.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env', cache: true }),
    MongooseModule.forRootAsync(MongooseConfig),
    AuthModule,
    JwtConfigModule,
    CurriculumModule,
    EmailModule,
    AssesmentModule,
    AwsModule
  ],
  controllers: [],
  providers: [
    CommonService,
    {
      provide:APP_INTERCEPTOR,
      useClass:ResponseInterceptor
    },
    {
      provide:APP_FILTER,
      useClass:HttpExceptionFilter
    }
  ],
  exports:[CommonService]
})
export class AppModule {}
