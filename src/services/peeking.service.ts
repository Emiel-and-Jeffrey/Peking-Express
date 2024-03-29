import { Injectable } from "@nestjs/common";
import { AStarService } from "./a-star.service";
import { Edge, GraphNode, IMapRequest } from "../interfaces";
import { GameMap } from "../classes/game-map.class";
import { IGameTest } from "../interfaces/game-test";

@Injectable()
export class PeekingService
{

    private map: GameMap;
    private budget: number;

    constructor(
      private readonly service: AStarService,
    )
    {

    }

    /**
     * Initialize the map
     * @param mapRequest the map you want to make
     * @param budget the budget for this game
     */
    public InitializeMap(mapRequest: IMapRequest, budget: number): GameMap
    {
        this.map = new GameMap(mapRequest);
        this.budget = budget;
        return this.map;
    }

    /**
     * Update a competitors location on the map
     * @param groupID the id for this group
     * @param location the location you want to move it to
     */
    public UpdateCompetitorLocation(groupID: number, location: number): void
    {
        this.map.MoveGroup(groupID, location);
    }

    /**
     * Set the start location for the player
     * @param playerID the id for the main player
     * @param location the location for the main player to start
     */
    public SetStartLocation(playerID: number, location: number): void
    {
        this.map.SetPlayer({ID: playerID, currentNode: this.map.GetGraph().GetNode(location) });
    }

    /**
     * Get the next move for the player character
     * @param target the target node
     */
    public NextMove(target: number): Edge
    {
        if (this.map.GetPlayer() === undefined)
            return undefined;

        const edges: Edge[] = this.service.GetPath(this.map, this.map.GetPlayer().currentNode,  this.map.GetGraph().GetNode(target), this.budget);

        if (edges.length <= 0)
        {
            return undefined;
        }

        const move = edges.shift();
        this.budget -= move.weight;
        this.map.GetPlayer().currentNode = move.endNode;
        return move;
    }

    /**
     * Run a test game
     * @param game the test game
     */
    public TestGame(game: IGameTest): Edge[]
    {
        this.InitializeMap(game.map, game.budget);
        this.SetStartLocation(-1, game.startLocation);
        const path: Edge[] = [];
        for (const values of game.players)
        {
            path.push(this.NextMove(88));
            if (this.map.GetPlayer().currentNode.ID === 88)
            {
                break;
            }
            this.map.SetGroupPositions(values);
        }
        return path;
    }
}
