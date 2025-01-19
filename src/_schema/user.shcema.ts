import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { DB_COLLECTION_NAME } from 'src/_constant/database.constant';

@Schema({
  timestamps: true,
  collection: DB_COLLECTION_NAME.users,
  autoIndex: true,
})
export class UserSchemaClass extends Document {
  @Prop({ unique: true, required: true }) 
  user_id: string;

  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true })
  father_name: string;

  @Prop({ required: true })
  mother_name: string;

  @Prop({ unique: true, required: true }) 
  adhar_number: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  date_of_birth: Date; // Use `Date` type if possible for better validation

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  mobile_no: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  enrollment_date: Date; 

  @Prop({ default: 0 }) 
  status: number;

  @Prop({ type: MongooseSchema.Types.Mixed }) 
  data: object;
}

export const UserSchema = SchemaFactory.createForClass(UserSchemaClass);
