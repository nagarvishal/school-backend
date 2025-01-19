import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { UserServices } from '../services/user.service';
import { UserInterface } from '../interface';
import { StudentDataDTO } from '../dto/user.dto';

@Controller('/user')
export class UserController {
    constructor(@Inject(UserServices) private SService:UserServices){}
    @Get()
    async getUsers(@Query() query:any) {
        
        return await this.SService.getUsers(query);
    }
    @Get("/:user_id")
    getUser(@Param("user_id") user_id:string){
        return this.SService.getUser(user_id);
    }

    @Post()
    postUser(@Body()reqbody:StudentDataDTO | StudentDataDTO[]){
        return this.SService.addUser(reqbody);
    }
    
    @Put()
    updateUser(){
        return this.SService.updateUser()
    }

    @Delete()
    deleteUser(){
        return this.SService.deleteUser()
    }
}
