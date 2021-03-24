import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { PeekingService } from "services/peeking.service";
import { Schemas } from "constants/schemas";
import { Edge, GraphNode, IMapRequest } from "../interfaces";
import { GameMap } from "../classes/game-map.class";
import { IGameTest } from "../interfaces/game-test";

@Controller(Schemas.pekingSchema)
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
    public nextMove(@Param("target", ParseIntPipe) target: number): Edge
    {
        const node = this.service.NextMove(target);
        return node === undefined ? {weight: -1, startNode: undefined, endNode: undefined} : node;
    }

    @Post("/testGame")
    public testGame(@Body() game: IGameTest): number[]
    {
        const edges: Edge[] = this.service.TestGame(game);

        if (edges === [])
            return [];

        let edge = edges.shift();
        const route: number[] =  [edge.startNode.ID];
        while (edge !== undefined)
        {
            route.push(edge.endNode.ID);
            edge = edges.shift();
        }
        return route;
    }
}
