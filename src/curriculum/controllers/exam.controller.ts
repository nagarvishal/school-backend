import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { ExamService } from "../services/exam.service";
import { ExamDataDTO } from "../dto/common.dto";
import { Request } from "express";

@Controller("/exam")
export class ExamController{
    constructor(private examservice:ExamService){}
    @Get()
    async getExams(){
        return await this.examservice.getExams();
    }

    @Post("/add")
    async postExam(@Body() reqbody:ExamDataDTO,@Req() req:Request){
        this.examservice["req"] = req;
        return await this.examservice.addExam(reqbody);
    }

    @Post("/delete/:exam_id")
    async deleteExam(@Param("exam_id") exam_id : string){
        return await this.examservice.deleteExam(exam_id);
    }
}