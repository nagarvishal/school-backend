import { Type } from "class-transformer";
import { IsArray, IsDate, IsDateString, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";

export class StudentDataDTO
{
    @IsNotEmpty()
    @IsString()
    first_name: string;

    @IsNotEmpty()
    @IsString()
    last_name: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail({}, { message: 'Invalid email format' })
    email:string

    @IsNotEmpty()
    @IsString()
    father_name: string;

    @IsNotEmpty()
    @IsString()
    mother_name: string;

    @IsNotEmpty()
    @IsString()
    adhar_number: string;

    @IsNotEmpty()
    @IsString()
    mobile_no: string;

    @IsNotEmpty()
    @IsString()
    role: string;

    @IsNotEmpty()
    @IsDate()
    date_of_birth: Date;

    @IsNotEmpty()
    @IsString()
    gender: string;


    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsDate()
    enrollment_date: Date;

    @IsNotEmpty()
    @IsInt()
    status: number;

    @IsString()
    class:string;

    @IsString()
    stream:string;

    @IsArray()
    subjects:string[]

    @IsString()
    section:string

}
