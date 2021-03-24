import { Injectable } from "@nestjs/common";
import { GraphNode } from "../interfaces";
import { Edge } from "../interfaces";
import { GameMap } from "../classes/game-map.class";

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
  /**
   * Get the path from a start node to a specific end node
   * @param map the map to walk trough
   * @param startNode the start node
   * @param endNode the end node
   * @param budget the maximum you want to spend
   */
  public GetPath(map: GameMap, startNode: GraphNode, endNode: GraphNode, budget: number): Edge[]
  {
    if (!map || !startNode || !endNode)
      return [];

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
          if ((edge.endNode.isCritical === true && map.IsGroupOnNode(edge.endNode)))
          {
            continue;
          }

          let neighbor = AStarService.FindChoice(openSet, edge.endNode);
          let addToOpenSet = false;
          if (neighbor === undefined)
          {
            neighbor =  AStarService.CreateAStarChoice(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, edge.endNode, undefined);
            addToOpenSet = true;
          }

          const neighborScore = edge.weight + choice.fScore;
          if (neighbor.fScore > edge.weight + choice.fScore && neighborScore < budget)
          {
            neighbor.gScore = neighborScore;
            neighbor.hScore =  choice.hScore + 1;
            neighbor.fScore = edge.weight + choice.hScore;
            neighbor.node = edge.endNode;
            neighbor.parent = choice;
            neighbor.edge = edge;

            if (addToOpenSet)
            {
              openSet.push(neighbor);
            }
          }

      }
      openSet.sort(function(a, b) { return a.fScore - b.fScore; });
    }
    return [];
  }

  /***
   * Create a AStarChoice instance
   * @param gScore the weight
   * @param hScore the h score
   * @param node the node that you are
   * @param parent the parent node that you had
   * @private
   */
  private static CreateAStarChoice(gScore: number, hScore: number, node: GraphNode, parent: AStarChoice): AStarChoice
  {
    return  {fScore: gScore + hScore, gScore: gScore, hScore: hScore, node: node, parent: parent, edge: undefined};
  }

  /**
   * Find a choice in a specific set
   * @param set the set you want to check
   * @param node the node you want to find
   * @private
   */
  private static FindChoice(set: AStarChoice[], node: GraphNode): AStarChoice
  {
    for (const choice of set)
    {
      if (choice.node === node)
        return choice;
    }
    return undefined;
  }

  /**
   * Loop trough parents to get the path in edges
   * @param checkedNodes the last node
   * @private
   */
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