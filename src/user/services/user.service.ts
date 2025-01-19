import { Model } from 'mongoose';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DB_COLLECTION_NAME, CONNECTION_NAME } from 'src/_constant/database.constant';
import { UserInterface } from '../interface';
import { DEFAULT_MONGODB_ANTI_PROJECTION } from 'src/_constant/database.constant';
import { CommonService } from 'src/_common/common.service';

@Injectable()
export class UserServices {
    constructor(
        @InjectModel(DB_COLLECTION_NAME.users, CONNECTION_NAME)
        private readonly userDBModel: Model<any>,

        @InjectModel(DB_COLLECTION_NAME.unique,CONNECTION_NAME)
        private readonly uniqueDBModel:Model<any>,

        private service:CommonService
    ) {}

    private buildfilterObject(query:any){
        const filter = {};
        if(query?.first_name) filter["first_name"] = query.first_name;
        if(query?.last_name) filter["last_name"] = query.last_name;
        if(query?.email)   filter["email"] = query.email;
        if(query?.father_name) filter["father_name"] = query.father_name;
        if(query?.mother_name) filter["mother_name"] = query.mother_name;
        if(query?.adhar_number) filter["adhar_number"] = query.adhar_number;
        if(query?.mobile_no) filter["mobile_no"] = query.mobile_no;
        if(query?.role) filter["role"] = query.role;
        if(query?.date_of_birth) filter["date_of_birth"] = query.date_of_birth;
        if(query?.gender) filter["gender"] = query.gender;
        if(query?.address) filter["address"] = query.address;
        if(query?.enrollment_date) filter["enrollment_date"] = query.enrollment_date;
        if(query?.class) filter["data.class"] = query.class;
        if(query?.stream)filter["data.stream"] = query.stream;
        if(query?.subject)filter["data.subjects"] = query.subject
        return filter;

    }
    public async getUsers(query:any) {
        const filterObject = this.buildfilterObject(query||{});
        const response = await this.userDBModel.find(filterObject,{ ...DEFAULT_MONGODB_ANTI_PROJECTION,first_name:0,last_name:0,mobile_no:0});
        const respArray = [];
        for(let data of response){
            data.data["user_id"] = data.user_id;
            respArray.push(data.data);
        }
        return respArray;
    }

    public async getUser(user_id:string) {
        if(user_id){
            const response = await this.userDBModel.findOne({user_id:user_id},{...DEFAULT_MONGODB_ANTI_PROJECTION});
            return response;
        }
        else{
            throw new HttpException("user_id is not valid",HttpStatus.BAD_REQUEST);
        }
    }

    public updateUser() {
      
    }

    public deleteUser() {

    }

    public async addUser(data: UserInterface | UserInterface[]) {
        if(Array.isArray(data)){
            const resArr = [];
            for(let userdata of data){
                try{
                    if(!await this.userDBModel.findOne({adhar_number:userdata.adhar_number},{...DEFAULT_MONGODB_ANTI_PROJECTION})){
                        var user_id = await this.service.genunique(this.uniqueDBModel,"userunique","UI","");
                        await this.userDBModel.create({user_id:user_id,...userdata,data:{...userdata}});
                        var response = await this.userDBModel.findOne({user_id:user_id},{...DEFAULT_MONGODB_ANTI_PROJECTION});
                        resArr.push(response);
                    }
                    else{
                        resArr.push({
                            adhar_number:userdata.adhar_number,
                            message:"given user is already exist"
                        })
                    }
                }catch(e){
                    resArr.push({
                        adhar_number:userdata.adhar_number,
                        message:e.message?e.message:e
                    })
                }
            }
            return resArr;
        }
        else{
          const user_id = await this.service.genunique(this.uniqueDBModel,"userunique","UI","");
          await this.userDBModel.create({user_id:user_id,...data,data:{...data}});
          const response = await this.userDBModel.findOne({user_id:user_id},{...DEFAULT_MONGODB_ANTI_PROJECTION});
          return response;
        }
      }
}