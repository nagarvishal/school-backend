import { Inject, Injectable } from "@nestjs/common";
import { AwsService } from "src/_aws/services/aws.services";
import { InjectModel } from '@nestjs/mongoose';
import { CONNECTION_NAME, DB_COLLECTION_NAME } from "src/_constant/database.constant";
import { Model } from "mongoose";

@Injectable()
export class DocumentService
{
    req:any={};
    constructor(
        @Inject(AwsService) private awsservice:AwsService,
        @InjectModel(DB_COLLECTION_NAME.document, CONNECTION_NAME)
        private readonly documentDBModel: Model<any>,
    ){}

    public async uploadFile(file:any,params:any)
    {
        const file_path = `${params["role"]}/${params["user_id"]}/${params["document_type"]}`;
        let response = await this.awsservice.uploadFile(file,file_path,false);
        return response;
    }

    public async fetchFile(params:any){
        const file_path = `${params.role}/${params.user_id}/${params["document_type"]}`;
        let response = await this.awsservice.getPresignedUrl(file_path);
        return response;
    }

    public async deleteFile(params:any)
    {
        const file_path = `${params.role}/${params.user_id}/${params["document_type"]}`;
        let response = await this.awsservice.deleteFile(file_path);
        return response;
    }
}