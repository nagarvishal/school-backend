import { Body, Controller, Inject, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthModule } from "./auth.module";

@Controller("/login")
export class AuthController{
    constructor(@Inject(AuthService)public AuthService:AuthService){}
    @Post()
    login(@Body() reqbody:Record<string,any>){
        return this.AuthService.login(reqbody);
    }
}