import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Schemas } from "constants/schemas";
import { IExampleModel } from "schemas/example.schema";

@Injectable()
export class ExampleService
{
    constructor(
        @InjectModel(Schemas.exampleSchema)
        private readonly model: Model<IExampleModel>
    )
    { }

    public test(): string
    {
        return "test";
    }
}
