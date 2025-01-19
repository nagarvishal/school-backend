import { Global, Injectable } from "@nestjs/common";
import { Model } from "mongoose";


@Injectable()
export class CommonService
{
    async genunique(model:Model<any>, tag:string ,prefix:string ,suffix:string){
        const response = await model.findOne({});
        let unique_count = response[tag];
        let unique_id = prefix;
        let length = 15 - (String(unique_count + 1)).length - 2;
        for (let i = 1; i <= length; i++) {
            unique_id = unique_id + '0';
        }
        unique_id = unique_id + String(unique_count + 1);
        unique_count = unique_count + 1
        await model.updateOne({createdAt:response.createdAt},{[tag]:unique_count});
        return unique_id;
    }
}