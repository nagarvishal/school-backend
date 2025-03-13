import { Controller, Delete, Get, Header, Inject, Param, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FilesizeValidation } from "../pipes/filesize.validation";
import { DocumentService } from "../services/document.service";
import { Request } from "express";


@Controller("/user")
export class DocumentController
{
    constructor(@Inject(DocumentService) public documentService:DocumentService){}

    @Post("/document/:role/:user_id/:document_type")
    @UseInterceptors(FileInterceptor('file'))
    async postDocument(@UploadedFile( new FilesizeValidation() ) file: Express.Multer.File,@Param() params:any,@Req() req:Request){
        this.documentService["req"] = req;
        let response = await this.documentService.uploadFile(file,params);
        return response;
    }

    @Get("/document/:role/:user_id/:document_type")
    async getDocument(@Param() params:any)
    {
        try{
            let response = await this.documentService.fetchFile(params);
            return response;
        }catch(e){
            return e;
        }
    }


    @Delete("/document/:role/:user_id/:document_type")
    async deleteDocument(@Param() params:any)
    {
        try{
            let response = await this.documentService.deleteFile(params);
            return response;
        }catch(e){
            return e;
        }
    }

}