import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProjectModule } from "modules/project.module";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "guards/role.guard";
import { ModuleMetadata } from "@nestjs/common/interfaces";

export const AppMetaData: ModuleMetadata = {
    imports: [
        MongooseModule.forRoot(process.env.MONGO_URL, {
            connectTimeoutMS: 30000,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            keepAlive: true,
            useUnifiedTopology: true,
        }),
        ProjectModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
};

@Module(AppMetaData)
export class AppModule { }
