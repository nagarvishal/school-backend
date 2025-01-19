import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AssesmentController } from "./controllers/assesment.controller";
import { AssesmentService } from "./services/assesment.service";
import { MongooseModule } from "@nestjs/mongoose";
import { CONNECTION_NAME, DB_COLLECTION_NAME } from "src/_constant/database.constant";
import { AssesmentSchema } from "src/_schema/assesment.schema";
import { UniqueSchema } from "src/_schema/unique.schema";
import { CommonService } from "src/_common/common.service";
import { AuthMiddleware } from "src/_middlewares/auth.middleware";
import { QuestionSchema } from "src/_schema/assesment.schema";
import { AnswerSchema } from "src/_schema/assesment.schema";

@Module({
    imports:[
        MongooseModule.forFeature(
            [
              {
                name: DB_COLLECTION_NAME.assesment,
                schema: AssesmentSchema,
              },
              {
                name:DB_COLLECTION_NAME.answer,
                schema:AnswerSchema
              },
              {
                name:DB_COLLECTION_NAME.question,
                schema:QuestionSchema
              },
              {
                name:DB_COLLECTION_NAME.unique,
                schema:UniqueSchema
              }
            ],
            CONNECTION_NAME,
          ),
    ],
    controllers:[AssesmentController],
    providers:[AssesmentService, CommonService],
    exports:[AssesmentService, CommonService]

})
export class AssesmentModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(AuthMiddleware)
        .exclude({path:'login',method:RequestMethod.POST})
        .forRoutes(AssesmentController);
    }
}

