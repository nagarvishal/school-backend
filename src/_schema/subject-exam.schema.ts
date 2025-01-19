import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { DB_COLLECTION_NAME } from 'src/_constant/database.constant';

@Schema({
  timestamps: true,
  collection: DB_COLLECTION_NAME.subject_exam,
  autoIndex: true,
})
export class SubjectExamSchemaClass extends Document {

    @Prop({ unique: true, required: true }) 
    subject_exam_id:string

    @Prop({ required: true })
    subject_id: string;

    @Prop({ required: true })
    subject: string;

    @Prop({required:true})
    exam_id:string;

    @Prop({required:true})
    exam_name:string;

    @Prop({required:true})
    author:string;

    @Prop({required:true})
    update_by:string
}

const SubjectExamSchema = SchemaFactory.createForClass(SubjectExamSchemaClass);

SubjectExamSchema.index({subject_id : 1, exam_id : 1},{ unique : true });

export { SubjectExamSchema};