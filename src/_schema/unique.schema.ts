import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { DB_COLLECTION_NAME } from 'src/_constant/database.constant';

@Schema({
  timestamps: true,
  collection: DB_COLLECTION_NAME.unique,
  autoIndex: true,
})
export class UniqueSchemaClass extends Document {
  @Prop({ unique: true, required: true }) 
  userunique: number;

  @Prop({ required: true })
  subjectunique: number;

  @Prop({required:true})
  examunique:number

  @Prop({required:true})
  subjectexam:number

  @Prop({required:true})
  studentsubjectexam:number

  @Prop({required:true})
  assesment:number

  @Prop({required:true})
  question:number

  @Prop({required:true})
  answer:number

  @Prop({required:true})
  studentanswer:number
}

export const UniqueSchema = SchemaFactory.createForClass(UniqueSchemaClass);
