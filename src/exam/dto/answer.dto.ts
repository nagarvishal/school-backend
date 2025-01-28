
import {  IsNotEmpty, IsNumber, IsObject, IsString} from "class-validator";

export class StudentAnswersDTO
{
    @IsNotEmpty()
    @IsString()
    assesment_id: string;

    @IsNotEmpty()
    @IsString()
    class: string;

    @IsNotEmpty()
    @IsString()
    subject_id:string

    @IsString()
    @IsNotEmpty()
    user_id: string;

    @IsObject()
    answers:Record<string,any>
}