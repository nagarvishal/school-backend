import { Injectable } from "@nestjs/common";

@Injectable()
export class ComputeService
{
    private async calculateMakrs(answer1:any,answer2:any){
        answer1.sort();
        answer2.sort();
        if(answer1.length == answer2.length){
            for(let i=0;i<answer1.length;i++){
                console.log(answer1[i],answer2[i],"\n");
                if(answer1[i] != answer2[i]){
                    return false;
                }
            }
            return true;
        }
        else{
            return false;
        }
    }
    public async computeMarks(questions:any,answers:any){
        let marks = 0;
        const aqobject = {};
        const marksobject = {};
        for(let i=0;i<questions.length;i++){
            aqobject[questions[i].question_id] = questions[i].answer.split(',');
            marksobject[questions[i].question_id] = questions[i].marks;
        }

        for(let key of Object.keys(answers)){
            if(await this.calculateMakrs(answers[key],aqobject[key])){
                marks = marks + marksobject[key];
            }
        }
        return marks;
    }
    
}