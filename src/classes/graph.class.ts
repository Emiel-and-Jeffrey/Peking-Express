import { GraphNode } from "../interfaces";
import { Edge } from "../interfaces";

export class Graph
{
  private  readonly nodes: GraphNode[];
  private readonly edges: Edge[];

  public constructor()
  {
    this.nodes = [];
    this.edges = [];
  }

  public addNode(node: GraphNode): void
  {
    this.nodes.push(node);
  }

  public getNode(ID: number): GraphNode
  {
    for (const node of this.nodes)
    {
      if (node.ID === ID)
      {
        return node;
      }
    }
    return undefined;
  }

  public addEdge(edge: Edge): void
  {
    this.edges.push(edge);
  }

  public GetEdges(ID: number): Edge[]
  {
    const nodesEdges: Edge[] = [];
    for (const edge of this.edges)
    {
      if (edge.startNode.ID === ID || edge.endNode.ID === ID)
      {
        nodesEdges.push(edge);
      }
    }
    return nodesEdges;
  }

}