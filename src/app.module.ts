import { Module } from "@nestjs/common";
import { ProjectModule } from "modules/project.module";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "guards/role.guard";
import { ModuleMetadata } from "@nestjs/common/interfaces";

export const AppMetaData: ModuleMetadata = {
    imports: [
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
