import { Graph } from "../../src/classes/graph.class";
import { Edge } from "../../src/interfaces";

describe("Graph", () =>
{
  it("Add node: check if the node was added properly", async () =>
  {
    const graph: Graph = new Graph();
    const node = { ID: 10, isCritical: false};
    graph.AddNode(node);
    expect(graph.GetNode(node.ID)).toEqual(node);
  });

  it("Get node: Unknown node", async () =>
  {
    const graph: Graph = new Graph();
    expect(graph.GetNode(10)).toEqual(undefined);
  });

  it("Add edge: check if the node was added properly", async () =>
  {
    const graph: Graph = new Graph();
    const node = { ID: 10, isCritical: false};
    const endNode = { ID: 11, isCritical: true};
    const edges: Edge[] = [{ weight: 1, startNode: node, endNode: endNode }, { weight: 1, startNode: endNode, endNode: node }];

    graph.AddEdge(edges[0]);
    graph.AddEdge(edges[1]);
    expect(graph.GetEdges(node.ID)).toEqual(edges);
  });

  it("GetEdges: Get Edges no know Node", async () =>
  {
    const graph: Graph = new Graph();
    expect(graph.GetEdges(1)).toEqual([]);
  });
});