import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, isString, IsString, Matches } from "class-validator";

export class ExamDataDTO
{
    @IsNotEmpty()
    @IsString()
    exam_name: string;

    @IsNotEmpty()
    @IsString()
    max_marks: number;
}

export class SubjectDataDTO
{
    @IsNotEmpty()
    @IsString()
    subject:string
}

export class SubjectExamDataDTO
{
    @IsNotEmpty()
    @IsString()
    subject_id:string 

    @IsNotEmpty()
    @IsString()
    subject:string
    
    @IsNotEmpty()
    @IsString()
    exam_id:string

    @IsNotEmpty()
    @IsString()
    exam_name:string
}

export class StudentSubjectExamDataDTO
{
    @IsNotEmpty()
    @IsString()
    student_id:string

    @IsNotEmpty()
    @IsString()
    subject_id:string 
    
    @IsNotEmpty()
    @IsString()
    exam_id:string

    @IsNotEmpty()
    @IsNumber()
    marks:number
}

export class CommunicationDataDTO {
    @IsNotEmpty()
    @IsString()
    typeto: string;

    @IsArray()
    @IsString({ each: true })
    to_users: string[];

    @IsOptional()
    @IsString()
    to_classes: string;

    @IsNotEmpty()
    @IsString()
    subject: string;

    @IsOptional()
    @IsString()
    html: string;

    @IsOptional()
    @IsString()
    text: string;

    @IsArray()
    @IsString({ each: true })
    cc: string[];

    @IsArray()
    @IsString({ each: true })
    bcc: string[];

    @IsBoolean()
    for_email: boolean;

    @IsBoolean()
    for_sms: boolean;

    @IsBoolean()
    for_whatsupp: boolean;
}
