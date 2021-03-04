import { ArgumentsHost, Catch, ExceptionFilter, HttpException} from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter
{
    catch(exception: HttpException, host: ArgumentsHost)
    {
        const data = host.switchToHttp();
        const response: Response = data.getResponse();
        const request: Request = data.getRequest();

        response.status(exception.getStatus()).json({
            statusCode: exception.getStatus(),
            message: exception.message,
            path: request.url,
            timestamp: new Date().toISOString(),
        });
    }
}
