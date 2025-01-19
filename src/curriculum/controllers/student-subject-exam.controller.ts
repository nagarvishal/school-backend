import { Body, Controller, Get, Inject, Post, Query, Req } from "@nestjs/common";
import { StudentSubjectExamDataDTO } from "../dto/common.dto";
import { StudentSubjectExamService } from "../services/student-subject-exam.service";
import { Request } from "express";

@Controller("/student-subject-exam")
export class StudentSubjectExamController
{

    constructor(@Inject(StudentSubjectExamService) public SSEService:StudentSubjectExamService){}

    @Get()
    async getStudentMarks(@Query() query:any){
        return await this.SSEService.getStudentMarks(query);
    }

    @Post()
    async postStudentsSubjectExam(@Body() reqbody:StudentSubjectExamDataDTO,@Req() req:Request)
    {
        this.SSEService["req"] = req;
        if(Array.isArray(reqbody)){
            return await this.SSEService.postStudentsSubjectExam(reqbody);
        }
        else{
            return await this.SSEService.postStudentSubjectExam(reqbody);
        }
        // return reqbody.length;
    }

    
}