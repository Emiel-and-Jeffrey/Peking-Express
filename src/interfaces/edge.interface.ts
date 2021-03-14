import { GraphNode } from "./graph-node.interface";

export interface Edge
{
  weight: number;
  startNode: GraphNode;
  endNode: GraphNode;
}