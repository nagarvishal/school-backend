import { Inject, Injectable , Req , Res } from "@nestjs/common";
import * as AWS from 'aws-sdk';
import { ConfigService } from "@nestjs/config";
import { S3Client, GetObjectCommand, PutObjectCommand , DeleteObjectCommand } from '@aws-sdk/client-s3';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class AwsService
{
    AWS_S3_BUCKET:string = "";
    ACCESS_KEY_ID:string = "";
    SECRET_ACCESS_KEY:string = "";
    private client: S3Client;

    constructor(@Inject(ConfigService) private configService:ConfigService){
        this.AWS_S3_BUCKET = configService.get<string>("AWS_S3_BUCKET");
        this.ACCESS_KEY_ID = configService.get<string>("ACCESS_KEY_ID");
        this.SECRET_ACCESS_KEY  = configService.get<string>("SECRET_ACCESS_KEY");

        this.client = new S3Client({
            region: configService.get<string>('AWS_REGION'),
            credentials: {
              accessKeyId: configService.get<string>('ACCESS_KEY_ID'),
              secretAccessKey: configService.get<string>('SECRET_ACCESS_KEY'),
            },
        });
    }


    async uploadFile(file:any,file_path:string,isPublic:boolean){
        let key = file_path;
        let bucket = this.AWS_S3_BUCKET;
        const object = {
            Bucket : bucket,
            Key : key,
            Body: file.buffer,
            ContentType: file.mimetype,
            Metadata: {
                originalName: file.originalname,
            },
        }

        const command = new PutObjectCommand(object);

        const uploadResult = await this.client.send(command);
        return {
            url : isPublic ? await this.getFileUrl(key) : await this.getPresignedUrl(key),
            key:file_path,
            ispublic:isPublic
        }
    }

    async getFileUrl(key: string) {
        return `https://${this.AWS_S3_BUCKET}.s3.amazonaws.com/${key}`
    }

    async getPresignedUrl(key : string)
    {
        let command = new GetObjectCommand({
            Bucket:this.AWS_S3_BUCKET,
            Key:key
        })

        let url = await getSignedUrl(this.client, command, {
            expiresIn: 60 * 60 * 24, // 24 hours
        });

        return url;
    }

    async deleteFile(key:string){
        const command = new DeleteObjectCommand({
            Bucket:this.AWS_S3_BUCKET,
            Key:key
        })

        await this.client.send(command);
        return {
            message:"successfully deleted file",
            key:key
        }
    }
}