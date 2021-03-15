import { Injectable } from "@nestjs/common";
import { GraphNode } from "../interfaces";
import { Edge } from "../interfaces";
import { GameMap } from "../classes/game-map.class";
import { Graph } from "../classes/graph.class";
import PriorityQueue from "ts-priority-queue/src/PriorityQueue";

interface AStarChoice
{
  fScore: number;
  gScore: number;
  hScore: number;
  node: GraphNode;
  edge: Edge;
  parent: AStarChoice;
}

@Injectable()
export class AStarService
{
  public GetPath(map: GameMap, startNode: GraphNode, endNode: GraphNode, budget: number): Edge[] {

    const graph = map.GetGraph();
    const openSet: AStarChoice[] = [AStarService.CreateAStarChoice(0, 0, startNode, undefined)];

    while (openSet.length > 0)
    {
      const choice = openSet.shift();

      if (choice.node === endNode)
      {
          return AStarService.GeneratePath(choice);
      }

      for (const edge of graph.GetEdges(choice.node.ID))
      {
          let neighbor = AStarService.FindChoice(openSet, edge.endNode);
          if (neighbor === undefined)
          {
            neighbor =  AStarService.CreateAStarChoice(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, edge.endNode, undefined);
            openSet.push(neighbor);
          }


          const neighborScore = edge.weight + choice.fScore;
          if (neighbor.fScore > edge.weight + choice.fScore && neighborScore < budget)
          {
            neighbor.gScore = neighborScore;
            neighbor.hScore = 0;
            neighbor.fScore = edge.weight + choice.hScore;
            neighbor.node = edge.endNode;
            neighbor.parent = choice;
            neighbor.edge = edge;
          }

      }
      openSet.sort(function(a, b) { return a.fScore - b.fScore; });
    }
    return [];
  }

  private static CreateAStarChoice(gScore: number, hScore: number, node: GraphNode, parent: AStarChoice): AStarChoice
  {
    return  {fScore: gScore + hScore, gScore: gScore, hScore: hScore, node: node, parent: parent, edge: undefined};
  }

  private static FindChoice(set: AStarChoice[], node: GraphNode): AStarChoice
  {
    for (const choice of set)
    {
      if (choice.node === node)
        return choice;
    }
    return undefined;
  }

  private static GeneratePath(checkedNodes: AStarChoice)
  {
    const path: Edge[] = [];
    let current = checkedNodes;
    while (current.parent !== undefined)
    {
      path.push(current.edge);
      current = current.parent;
    }
    return path.reverse();
  }
}