import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ExamController } from "./controllers/exam.controller";
import { SubjectController } from "./controllers/subject.controller";
import { ExamService } from "./services/exam.service";
import { SubjectService } from "./services/subject.service";
import { MongooseModule } from "@nestjs/mongoose";
import { CONNECTION_NAME, DB_COLLECTION_NAME } from "src/_constant/database.constant";
import { ExamSchema } from "src/_schema/exame.schema";
import { SubjectSchema } from "src/_schema/subject.schema";
import { CommonService } from "src/_common/common.service";
import { UniqueSchema } from "src/_schema/unique.schema";
import { AuthMiddleware } from "src/_middlewares/auth.middleware";
import { SubjectExamController } from "./controllers/subject-exam.controller";
import { SubjectExamService } from "./services/subject-exam.service";
import { SubjectExamSchema } from "src/_schema/subject-exam.schema";
import { StudentSubjectExamSchema } from "src/_schema/student-subject-exam.schema";
import { StudentSubjectExamController } from "./controllers/student-subject-exam.controller";
import { StudentSubjectExamService } from "./services/student-subject-exam.service";
import { UserSchema } from "src/_schema/user.shcema";
import { CommunicationController } from "./controllers/communication.controller";
import { CommuncationService } from "./services/communication.service";



@Module({
    imports:[
        MongooseModule.forFeature(
            [
              {
                name: DB_COLLECTION_NAME.exam,
                schema: ExamSchema,
              },
              {
                name:DB_COLLECTION_NAME.subjects,
                schema:SubjectSchema
              },
              {
                name:DB_COLLECTION_NAME.unique,
                schema:UniqueSchema
              },
              {
                name:DB_COLLECTION_NAME.subject_exam,
                schema:SubjectExamSchema
              },
              {
                name:DB_COLLECTION_NAME.student_subject_exam,
                schema:StudentSubjectExamSchema
              },
              {
                name: DB_COLLECTION_NAME.users,
                schema: UserSchema,
              },
            ],
            CONNECTION_NAME,
          ),
    ],
    controllers:[ExamController, SubjectController, SubjectExamController, StudentSubjectExamController, CommunicationController],
    providers:[ExamService, SubjectService,CommonService, SubjectExamService, StudentSubjectExamService, CommuncationService],
    exports:[ExamService, SubjectService, CommonService, SubjectExamService, StudentSubjectExamService, CommuncationService]
})
export class CurriculumModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(SubjectController,ExamController,SubjectExamController,StudentSubjectExamController);
  }
}
