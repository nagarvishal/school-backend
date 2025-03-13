import { Global, Module } from "@nestjs/common";
import { ConfigModule,ConfigService  } from "@nestjs/config";
import { JwtModule,JwtService } from "@nestjs/jwt";


@Global()
@Module({
    imports:[
        JwtModule.registerAsync({
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory:async (configService:ConfigService)=>({
                secret:configService.get<string>('JWT_SECRET'),
                signOptions:{ expiresIn: '4h' },
            })
        })
    ],
    controllers:[],
    providers:[],
    exports:[JwtModule]
})
export class JwtConfigModule{}