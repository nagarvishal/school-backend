import { Injectable } from "@nestjs/common";
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService
{
    constructor(private readonly mailerService: MailerService) {}

    async sendMail( to: string[], cc: string[], bcc: string[], subject: string, text: string, html?: string,)
    {
        await this.mailerService.sendMail({
            to,         
            cc,         
            bcc,          
            subject,      
            text,          
            html,          
          });

          
          return {
            error:false,
            message:'Mail sent successfully'
          }
    }
    async sendSMS(){

    }
}