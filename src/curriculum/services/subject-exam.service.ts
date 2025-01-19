import { HttpException, HttpStatus, Inject, Injectable, Post } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CommonService } from "src/_common/common.service";
import { CONNECTION_NAME, DB_COLLECTION_NAME, DEFAULT_MONGODB_ANTI_PROJECTION } from "src/_constant/database.constant";

@Injectable()
export class SubjectExamService
{
    req: any;
    constructor(
        @InjectModel(DB_COLLECTION_NAME.unique,CONNECTION_NAME)
        private readonly uniqueDBModel:Model<any>,

        @InjectModel(DB_COLLECTION_NAME.subject_exam,CONNECTION_NAME)
        private readonly subjectExamDBModule:Model<any>,

        @Inject(CommonService) private service:CommonService

    ){

    }

    async getSubjectExams(subject_id:string){
        const data = (await this.subjectExamDBModule.find({subject_id:subject_id},{...DEFAULT_MONGODB_ANTI_PROJECTION})) || [];
        return data;
    }
    async addSubjectExam(data:any){
        const response = (await this.subjectExamDBModule.find({subject_id:data.subject_id,exam_id:data.exam_id},{...DEFAULT_MONGODB_ANTI_PROJECTION}));
        if(response.length==0){
            const subjectexam_id = await this.service.genunique(this.uniqueDBModel,"subjectexam","SE","");
            await this.subjectExamDBModule.create({
                subject_exam_id:subjectexam_id,
                ...data,
                author:this?.req?.profile?.email,
                update_by:this?.req?.profile?.email
            })
            return await this.subjectExamDBModule.find({subject_exam_id:subjectexam_id},{...DEFAULT_MONGODB_ANTI_PROJECTION})
        }
        else{
            throw new HttpException("Given Subject-Exam Ciriculum Is Already Exist in System - Duplicate Not Allowed",HttpStatus.BAD_REQUEST);
        }
    }
    
    async deleteSubjectExam(data:any){
        const response = (await this.subjectExamDBModule.find({subject_id:data.subject_id,exam_id:data.exam_id},{...DEFAULT_MONGODB_ANTI_PROJECTION}));
        if(response.length==0){
            throw new HttpException("Given Subject-Exam is Not Present in System - Not Able to delete given",HttpStatus.BAD_REQUEST);
        }
        else{
            await this.subjectExamDBModule.deleteOne( { subject_id:data.subject_id, exam_id:data.exam_id} );
            return {
                message:"deleted successfulluy"
            }
        }
    }
}