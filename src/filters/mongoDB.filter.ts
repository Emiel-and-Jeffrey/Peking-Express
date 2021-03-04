import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus} from "@nestjs/common";
import { MongoError } from "mongodb";
import { Response } from "express";

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter
{
    catch(exception: MongoError, host: ArgumentsHost)
    {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        switch (exception.code)
        {
            case 11000:
                response.status(HttpStatus.BAD_REQUEST).json({
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: exception.message,
                    path: request.url,
                });
                break;
        }
    }
}
