import { Controller, Get } from "@nestjs/common";
import { ExampleService } from "services/example.service";
import { Schemas } from "constants/schemas";

@Controller(Schemas.exampleSchema)
export class ExampleController
{
    constructor(private readonly service: ExampleService) { }

    @Get("/")
    public test(): {}
    {
        return { test: this.service.test() };
    }
}
