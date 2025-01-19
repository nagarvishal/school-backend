import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { DB_COLLECTION_NAME } from 'src/_constant/database.constant';

@Schema({
  timestamps: true,
  collection: DB_COLLECTION_NAME.subjects,
  autoIndex: true,
})
export class SubjectSchemaClass extends Document {
  @Prop({ unique: true, required: true }) 
  subject_id: string;

  @Prop({ required: true,unique: true })
  subject: string;

  @Prop({required:true})
  author:string;

  @Prop({required:true})
  update_by:string
}

export const SubjectSchema = SchemaFactory.createForClass(SubjectSchemaClass);