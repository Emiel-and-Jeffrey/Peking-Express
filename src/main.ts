import * as dotenv from "dotenv-safe";
dotenv.config({ allowEmptyValues: false });

import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { BadRequestException, ValidationError, ValidationPipe } from "@nestjs/common";

async function Initialize(): Promise<void>
{
    const cors = getCorsOptions();
    const app = await NestFactory.create(AppModule, { cors });
    app.useGlobalPipes(
      new ValidationPipe({
          exceptionFactory: (validationErrors: ValidationError[] = []) => {
              return new BadRequestException(validationErrors);
          },
      })
    );

    const options = new DocumentBuilder()
        .setTitle("API")
        .setDescription("Used by the applications of MMP")
        .setVersion("1.0")
        .addApiKey(
            { type: "apiKey", name: "Authorization", in: "header" },
            "access-token",
        )
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("api", app, document);

    await app.listen(process.env.PORT);
}
Initialize();

/**
 * Returns the options required for CORS
 */
function getCorsOptions(): CorsOptions
{
    return {
        origin:
            process.env.ENVIRONMENT === "PROD" ? /((https?:\/\/)?(www.)?)?project-name\.nl\/?/ : "*",
        methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["content-type", "Authorization", "OrganizationID"],
    } as CorsOptions;
}