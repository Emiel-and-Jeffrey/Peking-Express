import { MiddlewareConsumer, Module, HttpModule, RequestMethod } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ExampleController } from "controllers/example.controller";
import { ExampleService } from "services/example.service";
//import { ExampleSchema } from "schemas/example.schema";
import { Schemas } from "constants/schemas";
import { HttpExceptionFilter } from "filters/exception.filter";
import { APP_FILTER } from "@nestjs/core";
import { MongoExceptionFilter } from "filters/mongoDB.filter";
import { ValidationFilter } from "filters/validation.filter";
import { AuthenticationMiddleware } from "middleware/authentication.middleware";

@Module({
    imports: [
        HttpModule,
    ],
    controllers: [
        /*Fill controllers here */
        ExampleController,
    ],
    providers: [
        /* Fill services here */
        ExampleService,
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
    ],
})

export class ProjectModule
{
    constructor() { }

    configure(consumer: MiddlewareConsumer)
    {
        /* Fill middleware here */
        consumer.apply(AuthenticationMiddleware).forRoutes({
            path: "*", method: RequestMethod.ALL
        });
    }
}