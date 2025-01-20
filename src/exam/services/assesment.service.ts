import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CONNECTION_NAME, DB_COLLECTION_NAME, DEFAULT_MONGODB_ANTI_PROJECTION } from "src/_constant/database.constant";
import { CommonService } from "src/_common/common.service";

@Injectable()
export class AssesmentService{
    constructor(
        @InjectModel(DB_COLLECTION_NAME.assesment, CONNECTION_NAME)
        private readonly assesmentDBModel: Model<any>,

        @InjectModel(DB_COLLECTION_NAME.unique,CONNECTION_NAME)
        private readonly uniqueDBModel:Model<any>,

        @InjectModel(DB_COLLECTION_NAME.question,CONNECTION_NAME)
        private readonly questionDBModel:Model<any>,

        @InjectModel(DB_COLLECTION_NAME.answer,CONNECTION_NAME)
        private readonly answerDBModel:Model<any>,


        @Inject(CommonService) public service:CommonService
    ){
        
    }

    public async addAssesment(reqbody:any){
        const assesment_id = await this.service.genunique(this.uniqueDBModel,"assesment","AI","");
        var response = await this.assesmentDBModel.create({assesment_id : assesment_id, ...reqbody});
        response = await this.assesmentDBModel.findOne({assesment_id:assesment_id },{...DEFAULT_MONGODB_ANTI_PROJECTION});
        return response;
    }

    public async fetchAssesment(assesment_id:string){
        if(assesment_id){
            const response = await this.assesmentDBModel.find({assesment_id : assesment_id},{...DEFAULT_MONGODB_ANTI_PROJECTION});
            return response;
        }
        else{
            const response = await this.assesmentDBModel.find({},{...DEFAULT_MONGODB_ANTI_PROJECTION});
            return response;
        }
    }
    public async fetchQuesions(assesment_id:string,ans:boolean){
        const questions = await this.questionDBModel.find({ assesment_id : assesment_id },{...DEFAULT_MONGODB_ANTI_PROJECTION}).lean();
        if(ans){
            for(let question of questions){
                var answer = await this.answerDBModel.findOne({ question_id : question.question_id},{...DEFAULT_MONGODB_ANTI_PROJECTION});
                question.answer = answer?.answer;
                console.log(answer);
            }
            return questions;
        }
        else
            return questions;
    }

    public async addQuestionToAss(reqbody:any){
        const assesment_id = reqbody.assesment_id;
        const responseArray = [];
        let i=0;
        for(let question of reqbody.questions){
            try{
                var question_id = await this.service.genunique(this.uniqueDBModel,"question","QN","");
                await this.questionDBModel.create({ assesment_id:assesment_id, question_id:question_id, ...question });

                var answer_id = await this.service.genunique(this.uniqueDBModel,"answer","AN","");
                await this.answerDBModel.create({ question_id : question_id, answer_id : answer_id, answer : question.answer });

                responseArray.push({ index:i, error:false, message:"successfully added" })
                i++;

            }catch(e){
                responseArray.push({
                    index:i,
                    error:true,
                    message:"Failure to Added"
                })
                i++;
            }
        }
        return responseArray;
    }

    public async deleteQuestion(question_id:string){
        if(question_id){
            await this.questionDBModel.deleteOne({question_id : question_id});
            await this.answerDBModel.deleteOne({question_id : question_id});
            return {
                question_id:question_id,
                message : "Deleted Successfully"
            }
        }
        else throw new HttpException("Given Question Id is not Defined",HttpStatus.BAD_REQUEST);
    }



}

/** -> a,b,cd
 *     border: 1px solid gray;
    border-radius: 39px;
    padding: 17px 22px;
    background-color: #e3e3e3;
}
 */

/** complete length
 * display: flex
;
    flex-wrap: wrap;
    padding-bottom: 0px;
    border: 1px solid gray;
    border-radius: 32px;
 */