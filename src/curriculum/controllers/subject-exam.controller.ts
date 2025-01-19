import { Body, Controller, Get, Inject, Param, Post, Req } from "@nestjs/common";
import { SubjectExamService } from "../services/subject-exam.service";
import { SubjectExamDataDTO } from "../dto/common.dto";
import { CommonService } from "src/_common/common.service";

@Controller("/subject-exam")
export class SubjectExamController
{
    constructor(
        @Inject(SubjectExamService) private SubjectExamService:SubjectExamService
    ){

    }
    @Get("/:subject_id")
    async getSubjectExams(@Param("subject_id") subject_id:string){
        return await this.SubjectExamService.getSubjectExams(subject_id);
    }

    @Post("/add")
    async addSubjectExam(@Body() reqbody:SubjectExamDataDTO,@Req() req:Request){
        this.SubjectExamService["req"] = req;
        return await this.SubjectExamService.addSubjectExam(reqbody);
    }

    @Post("/delete")
    async deleteSubjectExam(@Body() reqbody:SubjectExamDataDTO){
        return await this.SubjectExamService.deleteSubjectExam(reqbody);
    }
}
