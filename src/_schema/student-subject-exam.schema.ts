import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { DB_COLLECTION_NAME } from 'src/_constant/database.constant';

@Schema({
  timestamps: true,
  collection: DB_COLLECTION_NAME.student_subject_exam,
  autoIndex: true,
})
export class StudentSubjectExamSchemaClass extends Document {

    @Prop({ unique: true, required: true }) 
    student_subject_exam_id:string

    @Prop({ required: true })
    student_id:string

    @Prop({ required: true })
    subject_id: string;

    @Prop({required:true})
    exam_id:string;

    @Prop({required:true})
    marks:Number

    @Prop({required:true})
    author:string;

    @Prop({required:true})
    update_by:string
}

const StudentSubjectExamSchema = SchemaFactory.createForClass(StudentSubjectExamSchemaClass);

StudentSubjectExamSchema.index({subject_id : 1, exam_id : 1, student_id : 1},{ unique : true });

export { StudentSubjectExamSchema};