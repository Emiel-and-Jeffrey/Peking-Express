import { MiddlewareConsumer, Module, HttpModule } from "@nestjs/common";
import { PeekingController } from "controllers/peeking.controller";
import { PeekingService } from "services/peeking.service";
import { HttpExceptionFilter } from "filters/exception.filter";
import { APP_FILTER } from "@nestjs/core";
import { MongoExceptionFilter } from "filters/mongoDB.filter";
import { ValidationFilter } from "filters/validation.filter";
import { AStarService } from "../services/a-star.service";

@Module({
    imports: [
        HttpModule,
    ],
    controllers: [
        /*Fill controllers here */
        PeekingController,
    ],
    providers: [
        /* Fill services here */
        PeekingService,
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
        {
            provide: APP_FILTER,
            useClass: MongoExceptionFilter,
        },
        {
            provide: APP_FILTER,
            useClass: ValidationFilter,
        },
        AStarService,
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})

export class ProjectModule
{
    constructor() { }

    configure(consumer: MiddlewareConsumer)
    {
    }
}