import { Global, Module } from "@nestjs/common";
import { AwsService } from "./services/aws.services";

@Global()
@Module({
    imports:[],
    controllers:[],
    providers:[AwsService],
    exports:[AwsService]
})
export class AwsModule{}