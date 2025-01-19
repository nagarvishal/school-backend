import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { SubjectService } from "../services/subject.service";
import { SubjectDataDTO } from "../dto/common.dto";
import { Request } from "express";

@Controller("/subject")
export class SubjectController{
    constructor(private subjectservice:SubjectService){}
    @Get()
    async getSubjects(){
        return await this.subjectservice.getSubjects();
    }

    @Post("/add")
    async addSubject(@Body() reqbody:SubjectDataDTO,@Req() req:Request ){
        this.subjectservice["req"] = req;
        return await this.subjectservice.addSubject(reqbody);
    }

    @Post("/delete/:subject_id")
    async deleteSubject(@Param("subject_id") subject_id:string,@Req() req:Request){
        this.subjectservice["req"] = req;
        return await this.subjectservice.deleteSubject(subject_id);
    }
}