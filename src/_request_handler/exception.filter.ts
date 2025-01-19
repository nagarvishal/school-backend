
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception?.getStatus ? exception?.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    console.log(exception);

    response
      .status(status)
      .json({
        statusCode: status,
        error: true,
        data:{
            message: exception?.message || "Internal server error",
            sub: "",
            data: exception || {}
        }
      });
  }
}