import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, ValidationError } from "@nestjs/common";
import { Response } from "express";
import mongoose from "mongoose";

@Catch(mongoose.Error.ValidationError)
export class ValidationFilter implements ExceptionFilter
{
  catch(exception: mongoose.Error.ValidationError, host: ArgumentsHost)
  {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: exception.message,
      path: request.url,
    });
  }
}
