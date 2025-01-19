import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { CommunicationDataDTO } from "../dto/common.dto";
import { CommuncationService } from "../services/communication.service";

@Controller("/communication")
export class CommunicationController{
    constructor(public service:CommuncationService){

    }
    @Post()
    async sendEmailSMS(@Body() reqobj:CommunicationDataDTO){
        const resarray = [];
        if(reqobj.for_email)
            resarray.push(await this.service.sendEmail(reqobj));
        if(reqobj.for_sms)
            resarray.push(await this.service.sendSMS(reqobj));
        if(reqobj.for_whatsupp)
            resarray.push(await this.service.sendWhastupp(reqobj));
        return resarray;
    }

    @Get()
    getTemplate(){
        console.log()
    }
}