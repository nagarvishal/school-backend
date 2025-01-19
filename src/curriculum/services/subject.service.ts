import { Model } from 'mongoose';
import { HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DB_COLLECTION_NAME, CONNECTION_NAME } from 'src/_constant/database.constant';
import { DEFAULT_MONGODB_ANTI_PROJECTION } from 'src/_constant/database.constant';
import { CommonService } from 'src/_common/common.service';

@Injectable()
export class SubjectService{
    req: any;
    constructor(
        @InjectModel(DB_COLLECTION_NAME.subjects, CONNECTION_NAME)
        private readonly subjectDBModel: Model<any>,

        @InjectModel(DB_COLLECTION_NAME.unique,CONNECTION_NAME)
        private readonly uniqueDBModel:Model<any>,

        @Inject(CommonService) private service:CommonService
    ) {
        
    }

    public async getSubjects(){
        const subjects = await this.subjectDBModel.find({},{...DEFAULT_MONGODB_ANTI_PROJECTION});
        return subjects;
    }

    public async addSubject(subjectbody:any){
        const subject_id = await this.service.genunique(this.uniqueDBModel,"subjectunique","SB","");
        await this.subjectDBModel.create({
            subject_id:subject_id,
            ...subjectbody,
            author:this?.req?.profile?.email,
            update_by:this?.req?.profile?.email
        });
        const response = await this.subjectDBModel.findOne({subject_id:subject_id},{...DEFAULT_MONGODB_ANTI_PROJECTION});
        return {
            ...response,
            message:"Subject inserted successfully"
        }
    }

    public async deleteSubject(subject_id:string){
        const response = await this.subjectDBModel.deleteOne({subject_id:subject_id});
        return {
            subject_id:subject_id,
            message:"Subject deleted successfully"
        }
    }
}