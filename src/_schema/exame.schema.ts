import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { DB_COLLECTION_NAME } from 'src/_constant/database.constant';

@Schema({
  timestamps: true,
  collection: DB_COLLECTION_NAME.exam,
  autoIndex: true,
})
export class ExamSchemaClass extends Document {
  @Prop({ unique: true, required: true }) 
  exam_id: string;

  @Prop({ unique: true,required: true })
  exam_name: string;

  @Prop({ required: true })
  max_marks:number

  @Prop({required:true})
  author:string;

  @Prop({required:true})
  update_by:string
}

export const ExamSchema = SchemaFactory.createForClass(ExamSchemaClass);