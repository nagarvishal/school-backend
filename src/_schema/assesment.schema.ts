import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { DB_COLLECTION_NAME } from 'src/_constant/database.constant';


@Schema({
    timestamps: true,
    collection: DB_COLLECTION_NAME.assesment,
    autoIndex: true,
})
export class AssesmentSchemaClass extends Document
{
    @Prop({ unique: true,required: true, type:String })
    assesment_id : string;

    @Prop({required : true, type:String})
    title:string

    @Prop({type:String})
    description : string

    @Prop({type:Number})
    duration : number

    @Prop({type:String, required:true})
    subject_id : string

    @Prop({type : String, required:true})
    class : string

    @Prop({type: MongooseSchema.Types.Mixed})
    question_ids : string[]

}

export const AssesmentSchema = SchemaFactory.createForClass(AssesmentSchemaClass);


@Schema({
    timestamps: true,
    collection: DB_COLLECTION_NAME.question,
    autoIndex: true,
})
export class QuestionSchemaClass extends Document
{
    @Prop({ unique: true,required: true, type:String })
    question_id : string

    @Prop({required:true})
    assesment_id : string

    @Prop({type:String,required:true})
    question_text:string

    @Prop({type:String,required:true})
    question_type:string

    @Prop({type: MongooseSchema.Types.Mixed})
    options : string[] | null | undefined

    @Prop({type:Number,required:true})
    marks:number
}

export const QuestionSchema = SchemaFactory.createForClass(QuestionSchemaClass);


@Schema({
    timestamps: true,
    collection: DB_COLLECTION_NAME.answer,
    autoIndex: true,
})
export class AnswerSchemaClass extends Document
{
    @Prop({ unique: true,required: true, type:String })
    answer_id:string

    @Prop({unique:true,required:true,type:String})
    question_id : string

    @Prop({required:true,type: MongooseSchema.Types.Mixed})
    answer : string[] | string | Number

}

export const AnswerSchema = SchemaFactory.createForClass(AnswerSchemaClass);

@Schema({
    timestamps:true,
    collection:DB_COLLECTION_NAME.studentanswers,
    autoIndex:true
})
export class StudentAnswersSchema extends Document
{
    @Prop({unique:true,required:true,type:String})
    student_answer_id:string

    @Prop({type:String,required:true})
    user_id:string

    @Prop({type:String,required:true})
    assesment_id:string

    @Prop({type:String,required:true})
    subject_id:string

    @Prop({type:String,required:true})
    class:string

    @Prop({type:Number,required:true})
    marks:number   
    
    @Prop({required:true,type: MongooseSchema.Types.Mixed})
    answers : Record<string,any>

    
}
export const StudentAnswerSchema = SchemaFactory.createForClass(StudentAnswersSchema);



