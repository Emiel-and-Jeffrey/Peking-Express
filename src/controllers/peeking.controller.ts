import { Body, Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { PeekingService } from "services/peeking.service";
import { Schemas } from "constants/schemas";
import { IMapRequest } from "../interfaces";

@Controller(Schemas.exampleSchema)
export class PeekingController
{
    constructor(private readonly service: PeekingService) { }

    @Get("/initialize")
    public initializeMap(@Body() map: IMapRequest): IMapRequest
    {
        return map;
    }

    @Get("/setStartLocation/:startLocation")
    public setStartLocation(@Param("startLocation", ParseIntPipe) startLocation: number): number
    {
        return startLocation;
    }

    @Get("/updateCompetitorLocation/:groupID/:location")
    public updateCompetitorLocation(@Param("groupID", ParseIntPipe) groupID: number,
                                    @Param("location", ParseIntPipe) location: number): number
    {
        return groupID;
    }

    @Get("/nextMove")
    public nextMove(): number
    {
        return 0;
    }
}
