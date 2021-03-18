import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { PeekingService } from "services/peeking.service";
import { Schemas } from "constants/schemas";
import { IMapRequest } from "../interfaces";
import { GameMap } from "../classes/game-map.class";

@Controller(Schemas.exampleSchema)
export class PeekingController
{
    constructor(private readonly service: PeekingService) { }

    @Post("/initialize/:budget")
    public initializeMap(@Body() map: IMapRequest,
                         @Param("budget", ParseIntPipe) budget: number): GameMap
    {
        return this.service.InitializeMap(map, budget);
    }

    @Get("/setStartLocation/:startLocation/:playerID")
    public setStartLocation(@Param("startLocation", ParseIntPipe) startLocation: number,
                            @Param("playerID", ParseIntPipe) playerID: number): void
    {
        this.service.SetStartLocation(playerID, startLocation);
    }

    @Get("/updateCompetitorLocation/:groupID/:location")
    public updateCompetitorLocation(@Param("groupID", ParseIntPipe) groupID: number,
                                    @Param("location", ParseIntPipe) location: number): void
    {
        this.service.UpdateCompetitorLocation(groupID, location);
    }

    @Get("/nextMove/:target")
    public nextMove(@Param("target", ParseIntPipe) target: number): number
    {
        const node = this.service.NextMove(target);
        return node === undefined ? -1 : node.ID;
    }
}
