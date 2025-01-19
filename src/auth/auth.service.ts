import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CONNECTION_NAME, DB_COLLECTION_NAME, DEFAULT_MONGODB_ANTI_PROJECTION } from "src/_constant/database.constant";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService
{
    constructor(
        @InjectModel(DB_COLLECTION_NAME.users, CONNECTION_NAME)
        private readonly userDBModel: Model<any>,
        private jwtservice:JwtService
    ) {}
    async generateToken(payload:Record<string,any>):Promise<string>{
        return this.jwtservice.sign(payload)
    }
    async verifyToken(token:string):Promise<any>{
        return this.jwtservice.verify(token);
    }
    async login(userdata:Record<string,any>){
        const user = await this.userDBModel.findOne({...userdata},{...DEFAULT_MONGODB_ANTI_PROJECTION});
        if(user){
            const token = await this.generateToken({...user.data});
            return {
                user_id:user.user_id, ...user.data,"in-auth-token":token
            }
        }
        else{
            throw new HttpException("User is Not Authorized/Not-Exist in System",HttpStatus.UNAUTHORIZED);
        }
    }
}