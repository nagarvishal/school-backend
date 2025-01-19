import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";


@Injectable()
export class ResponseInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();
        return next.handle().pipe(
            map(async (data) => {
                const response = context.switchToHttp().getResponse();
                const request = context.switchToHttp().getRequest();
                return {
                    statusCode: 0,
                    error: false,
                    message: "Success",
                    data:data
                };
            })
        );
    }
}
