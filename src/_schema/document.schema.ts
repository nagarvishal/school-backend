import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { DB_COLLECTION_NAME } from 'src/_constant/database.constant';



@Schema({
    timestamps: true,
    collection: DB_COLLECTION_NAME.document,
    autoIndex: true,
})
export class DocumentClassSchema extends Document
{
    @Prop({required : true, type:String})
    user_id:string;

    @Prop({required:true, type:String})
    role:string;

    @Prop({required:true, type:String})
    document_type:string;

    @Prop({required:true, type:String})
    aws_url:string;

    @Prop({required:true, type:String})
    aws_key:string;

    @Prop({required:true, type:String})
    author:string

    @Prop({required:true, type:String})
    update_by:string
}


export const DocumentSchema = SchemaFactory.createForClass(DocumentClassSchema);