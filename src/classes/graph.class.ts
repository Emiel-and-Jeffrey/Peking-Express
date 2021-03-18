import { GraphNode } from "../interfaces";
import { Edge } from "../interfaces";

export class Graph
{
  private  readonly nodes: GraphNode[];
  private readonly edges: Edge[];

  /**
   * Initialize the graph with no nodes or edges
   */
  public constructor()
  {
    this.nodes = [];
    this.edges = [];
  }

  /**
   * Add a node to the graph
   * @param node the node you want to add
   */
  public AddNode(node: GraphNode): void
  {
    this.nodes.push(node);
  }

  /**
   * Get a node. When the node can not be found undefined will be returned.
   * @param ID the node ID
   */
  public GetNode(ID: number): GraphNode
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

  /**
   * Add and edge to the graph
   * @param edge the edge you want to add
   */
  public AddEdge(edge: Edge): void
  {
    this.edges.push(edge);
  }

  /**
   * Get all edges for a node. When the edge can not be found undefined will be returned.
   * @param ID a node ID you want the nodes for
   */
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