import { Body, Controller, Get, Inject, Param, Post, Query } from "@nestjs/common";
import { AssesmentDataDTO } from "../dto/assesment.dto";
import { AssesmentService } from "../services/assesment.service";
import { QuestionDataDTO } from "../dto/assesment.dto";

@Controller("/assesment")
export class AssesmentController{
    constructor(@Inject(AssesmentService)public aservice:AssesmentService){}

    @Post('/add')  /** This function for Add Assesment */
    async addAssesments(@Body() reqbody:AssesmentDataDTO){
        return await this.aservice.addAssesment(reqbody);
    }

    @Post("/question/add") /** This Function for Add Question to Assesment */
    async addQuestionToAss(@Body() reqbody:QuestionDataDTO){
        return await this.aservice.addQuestionToAss(reqbody);
    }

    @Post("/question/delete/:question_id") /** This function for delete Question */
    async deleteQuestion(@Param("question_id") question_id:string){
        return await this.aservice.deleteQuestion(question_id);
    }

    @Get("/question/:assesment_id") /** This si for fetch all question with answer of perticular assesments */
    async fetchQuestion(@Param("assesment_id") assesment_id : string){
        return await this.aservice.fetchQuesions(assesment_id,true);
    }

    @Get("/question/fetch/:assesment_id") /** This function for fetch question without answer of perticular assesment */
    async fetchQuestionsOnly(@Param("assesment_id") assesment_id : string){
        return await this.aservice.fetchQuesions(assesment_id,false);
    }




    



    @Get('/fetch')
    async fetchAssesments(@Query('assesment_id') assesment_id : string){
        return await this.aservice.fetchAssesment(assesment_id);
    } 


}
