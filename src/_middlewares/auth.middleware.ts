import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private jwtservice:JwtService){
        
    }
    
    async use(req: Request, res: Response, next: NextFunction) {
        try{
            var token = req.headers["in-auth-token"];
            let data = await this.verifyToken(token);
            req["profile"] = {...data};
            next();
        }catch(e){
            throw new UnauthorizedException("Token is Expired/Invalid");
        }
    }

    async verifyToken(token:any):Promise<any>{
        return await this.jwtservice.verify(token);
    }
}
