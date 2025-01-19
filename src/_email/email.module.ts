import { Global, Module } from "@nestjs/common";
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from "./email.service";
import { MongooseModule } from "@nestjs/mongoose";
import { CONNECTION_NAME, DB_COLLECTION_NAME } from "src/_constant/database.constant";
import { UniqueSchema } from "src/_schema/unique.schema";


@Global()
@Module({
    imports:[
        MongooseModule.forFeature(
            [
              {
                name:DB_COLLECTION_NAME.unique,
                schema:UniqueSchema
              }
            ],
            CONNECTION_NAME,
          ),
        MailerModule.forRoot({
            transport: {
              host: 'smtp.gmail.com', 
              port: 465,    
              secure: true,   
              auth: {
                user: '17vishalnagar2002@gmail.com',
                pass: 'okgt ixlb elfo zlpi',
              },
              maxConnections: 5,
              maxMessages: 100,
            },
            defaults: {
              from: '"No Reply" <17vishalnagar2002@gmail.com>', // Default "from" address
            },
          }),
    ],
    controllers:[],
    providers:[EmailService],
    exports:[EmailService]
})
export class EmailModule{}