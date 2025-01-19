import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CommonService } from "src/_common/common.service";
import { CONNECTION_NAME, DB_COLLECTION_NAME, DEFAULT_MONGODB_ANTI_PROJECTION } from "src/_constant/database.constant";


@Injectable()
export class StudentSubjectExamService
{
    student:any;
    subject:any;
    exam:any;
    req:any;
    constructor(
        @InjectModel(DB_COLLECTION_NAME.unique,CONNECTION_NAME)
        private readonly uniqueDBModel:Model<any>,

        @InjectModel(DB_COLLECTION_NAME.subject_exam,CONNECTION_NAME)
        private readonly subjectExamDBModule:Model<any>,

        @InjectModel(DB_COLLECTION_NAME.student_subject_exam,CONNECTION_NAME)
        private readonly studentMarksDBModule:Model<any>,

        @InjectModel(DB_COLLECTION_NAME.users, CONNECTION_NAME)
        private readonly userDBModel: Model<any>,

        @InjectModel(DB_COLLECTION_NAME.subjects, CONNECTION_NAME)
        private readonly subjectDBModel: Model<any>,

        @Inject(CommonService) private service:CommonService

    ){

    }

    private async filterfunction(query:any){
        const filter = {};
        if(query.subject_id)filter["subject_id"]=query.subject_id;
        if(query.exam_id)filter["exam_id"]=query.exam_id;
        
        if(query.class){
            const subject = await this.subjectDBModel.findOne({subject_id:query.subject_id});
            const subject_name = subject?.subject;
            const response = (await this.userDBModel.find({"data.class":query.class,"data.subjects":subject_name},{ ...DEFAULT_MONGODB_ANTI_PROJECTION,first_name:0,last_name:0,mobile_no:0})) || [];
            const studentIds = response.map(student => student.user_id);
            filter["student_id"] = {
                $in:studentIds
            }
        }
        if(query?.student_id) filter["student_id"]=query.student_id;
        if(query?.author) filter["author"]=query.author;
        if(query?.update_by) filter["update_by"]=query.update_by;
        return filter;
    }
    public async getStudentMarks(query:any){
        const filter = await this.filterfunction(query);
        const studentMakrs = await this.studentMarksDBModule.find(filter,{...DEFAULT_MONGODB_ANTI_PROJECTION});
        return studentMakrs;
    }
    private async validateSubjectStudent(student_id:string,subject_id:string,exam_id:string){
        const student = await this.userDBModel.findOne( { user_id:student_id },{...DEFAULT_MONGODB_ANTI_PROJECTION} );
        if(student){
            this.student = student;
            const subjects:Array<string> = student.data.subjects;
            const subject:any = await this.subjectDBModel.findOne({subject_id:subject_id},{...DEFAULT_MONGODB_ANTI_PROJECTION});
            if(subject){
                this.subject = subject;
                if(subjects.includes(subject.subject)){
                    const subjectExam = await this.subjectExamDBModule.findOne({subject_id:subject_id, exam_id:exam_id});
                    if(subjectExam){
                        return true;
                    }
                    else
                        throw new HttpException(`Selected Subject and Exam is not in Circulum`,HttpStatus.BAD_REQUEST);
                }
                else
                    throw new HttpException(`Given Subject(${subject.subject}) haven't in Student(${student.first_name + ' ' + student.last_name}) Circulum`,HttpStatus.BAD_REQUEST);
            }
            else{
                throw new HttpException(`Given Subject(${subject.subject}) is not present in system`,HttpStatus.BAD_REQUEST);
            }

        }
        else
             throw new HttpException(`Given Student - ${student_id} Is not Present in System`,HttpStatus.BAD_REQUEST);
    }

    async postStudentSubjectExam(obj:any){
        var student_id = obj.student_id;
        var subject_id = obj.subject_id;
        var exam_id    = obj.exam_id;
        var marks = obj.marks;
        await this.validateSubjectStudent(student_id,subject_id,exam_id);
        var data = await this.studentMarksDBModule.findOne({student_id,subject_id,exam_id},{...DEFAULT_MONGODB_ANTI_PROJECTION});
        if(data){
            await this.studentMarksDBModule.updateOne({student_subject_exam_id:data.student_subject_exam_id,update_by:this.req.profile.email},{marks:marks});
            return {
                student_id:student_id,
                subject_id:subject_id,
                exam_id:exam_id,
                error:false,
                message:"Marks Aas Been Added"
            }
        }
        else{
            var student_subject_exam_id = await this.service.genunique(this.uniqueDBModel,"studentsubjectexam","SS","");
            await this.studentMarksDBModule.create({
                student_subject_exam_id,student_id,subject_id,exam_id,marks,author:this.req.profile.email,update_by:this.req.profile.email
            })
            return {
                student_id:student_id,
                subject_id:subject_id,
                exam_id:exam_id,
                error:false,
                message:"Marks Aas Been Added"
            }
        }
    }
    async postStudentsSubjectExam(reqobj:any){
        let student_id = "";
        let subject_id = "";
        let exam_id = "";
        let marks:number = 0;

        let resArr = [];
        for(let obj of reqobj){
            try{
                student_id = obj.student_id;
                subject_id = obj.subject_id;
                exam_id    = obj.exam_id;
                marks = obj.marks;
                await this.validateSubjectStudent(student_id,subject_id,exam_id);
                var data = await this.studentMarksDBModule.findOne({student_id,subject_id,exam_id},{...DEFAULT_MONGODB_ANTI_PROJECTION});
                if(data){
                    await this.studentMarksDBModule.updateOne({student_subject_exam_id:data.student_subject_exam_id,update_by:this.req.profile.email},{marks:marks});
                    resArr.push({
                        student_id:student_id,
                        subject_id:subject_id,
                        exam_id:exam_id,
                        error:false,
                        message:"Marks Aas Been Added"
                    })
                }
                else{
                    var student_subject_exam_id = await this.service.genunique(this.uniqueDBModel,"studentsubjectexam","SM","");
                    await this.studentMarksDBModule.create({
                        student_subject_exam_id,student_id,subject_id,exam_id,marks,author:this.req.profile.email,update_by:this.req.profile.email
                    })
                    resArr.push({
                        student_id:student_id,
                        subject_id:subject_id,
                        exam_id:exam_id,
                        error:false,
                        message:"Marks Aas Been Added"
                    })
                }
            }catch(e){
                resArr.push({
                    student_id:student_id,
                    subject_id:subject_id,
                    exam_id:exam_id,
                    error:true,
                    message:e.message?e.message:e
                })
            }
        }

        return reqobj;
    }
}