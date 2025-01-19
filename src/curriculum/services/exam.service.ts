import { Model } from 'mongoose';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DB_COLLECTION_NAME, CONNECTION_NAME } from 'src/_constant/database.constant';
import { DEFAULT_MONGODB_ANTI_PROJECTION } from 'src/_constant/database.constant';
import { CommonService } from 'src/_common/common.service';

@Injectable()
export class ExamService{
    req: any;
    constructor(
        @InjectModel(DB_COLLECTION_NAME.exam, CONNECTION_NAME)
        private readonly examDBModel: Model<any>,

        @InjectModel(DB_COLLECTION_NAME.unique,CONNECTION_NAME)
        private readonly uniqueDBModel:Model<any>,
  

        @Inject(CommonService) public service:CommonService
    ) {}

    public async getExams(){
        const exams = await this.examDBModel.find({},{...DEFAULT_MONGODB_ANTI_PROJECTION});
        return exams;

        // return "hello world";
    }
    public async deleteExam(exam_id:string){
        await this.examDBModel.deleteOne({exam_id:exam_id});
        return {
            exam_id:exam_id,
            message:"successfully deleted"
        }
    }
    public async addExam(examdata:any){
        const exam_id = await this.service.genunique(this.uniqueDBModel,"examunique","EX","");
        await this.examDBModel.create({
            exam_id:exam_id,
            ...examdata,
            author:this?.req?.profile?.email,
            update_by:this?.req?.profile?.email
        });

        const response = await this.examDBModel.find({exam_id:exam_id},{...DEFAULT_MONGODB_ANTI_PROJECTION});
        return {
            ...response,
            message:"successfully inserted"
        }
    }
}