import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CONNECTION_NAME, DB_COLLECTION_NAME } from "src/_constant/database.constant";
import { EmailService } from "src/_email/email.service";


@Injectable()
export class CommuncationService{
    constructor(@InjectModel(DB_COLLECTION_NAME.users, CONNECTION_NAME) private readonly userDBModel: Model<any>,
    private emailservice:EmailService){

    }
    public async sendEmail(reqobj:any){
        var to:Array<string> = [];
        var cc:Array<string> = [];
        var bcc:Array<string> = [];
        var html:string = "";
        var subject:string = "";
        var text:string = "";
        if(reqobj.typeto=="user") to = reqobj.to_users;
        if(reqobj.typeto=="class"){
            to = []
            const emails = await  this.userDBModel.find({"data.class":reqobj.to_classes}, 'email').exec();
            for(let email of emails) to.push(email.email);
        }
        if(reqobj.typeto=="school"){
            to=[];
            const emails = await this.userDBModel.find({},'email').exec();
            for(let email of emails) to.push(email.email);
        }

        to.push("vishal19.nagar@tataaig.com");
        to.push("vishalnagar.191ch059@nitk.edu.in");
        cc = reqobj.cc;
        bcc = reqobj.bcc;
        subject =  reqobj.subject;
        html = reqobj.html;
        text = reqobj.text;
        let toArray:Array<string> = [];
        for(let i=0;i<to.length;i=i+99){
            toArray = [];
            for(let j=i;j<i+99 && j<to.length;j++){
                toArray.push(to[j]);
            }
            await this.emailservice.sendMail(toArray,cc,bcc,subject,text,html);
        }
        return "message send successfully";
    }
    public async sendSMS(reqobj:any){
        if(reqobj.typeto=="school"){
            return "school";
        }
        else if(reqobj.typeto=="class"){
            return "class";
        }
        else if(reqobj.typeto="user"){
            return "user";
        }
        else{
            return "no option selected";
        }
    }
    public async sendWhastupp(reqobj:any){
        if(reqobj.typeto=="school"){
            return "school";
        }
        else if(reqobj.typeto=="class"){
            return "class";
        }
        else if(reqobj.typeto="user"){
            return "user";
        }
        else{
            return "no option selected";
        }
    }
}