import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class FilesizeValidation implements PipeTransform
{
    transform(value: any, metadata: ArgumentMetadata) {
        let validfilesize = 10000000;
        if(value.size > validfilesize){
            throw new HttpException("user_id is not valid",HttpStatus.BAD_REQUEST);
        }
        return value;
    }
    
}