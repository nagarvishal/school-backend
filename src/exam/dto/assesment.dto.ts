import { Type } from "class-transformer";
import { IsArray, IsEmail, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, ValidateNested } from "class-validator";

export class AssesmentDataDTO
{
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    duration:number

    @IsArray()
    question_ids: string;

    @IsString()
    @IsNotEmpty()
    subject_id: string;

    @IsNotEmpty()
    @IsString()
    class: string;
}

class QuestionDto {
    @IsString()
    @IsNotEmpty()
    question_text: string;
  
    @IsString()
    @IsNotEmpty()
    question_type: string;
  
    @IsArray()
    @IsString({ each: true })
    options: string[];
  
    @IsInt()
    @IsNotEmpty()
    marks: number;
  
    @IsString()
    @IsNotEmpty()
    answer: string;
  }

export class QuestionDataDTO
{
    @IsString()
    @IsNotEmpty()
    assesment_id : string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QuestionDto)
    questions: QuestionDto[];

}
