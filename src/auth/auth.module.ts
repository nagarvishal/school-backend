import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from '@nestjs/mongoose';
import { CONNECTION_NAME, DB_COLLECTION_NAME } from "src/_constant/database.constant";
import { UserSchema } from "src/_schema/user.shcema";


@Module({
    imports:[MongooseModule.forFeature(
        [
          {
            name: DB_COLLECTION_NAME.users,
            schema: UserSchema,
          }
        ],
        CONNECTION_NAME,
      ),],
    controllers:[AuthController],
    providers:[AuthService],
    exports:[AuthService]
})
export class AuthModule{}