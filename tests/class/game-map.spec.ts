import { IMapRequest } from "../../src/interfaces";
import { GameMap } from "../../src/classes/game-map.class";
import { Graph } from "../../src/classes/graph.class";

describe("Game Map", () =>
{
    const mapRequest: IMapRequest = {
        locations: {
            number: 4,
            critical: [3]
        },
        connections:
          {
              source: [1, 1, 1, 2, 3],
              target: [2, 3, 88, 3, 88],
              price: [1, 3, 7, 1, 1]
          }
    };
    let map: GameMap;
    let graph: Graph;

    beforeEach(() =>
    {
        map = new GameMap(mapRequest);
        graph = map.GetGraph();
    });

    it("Constructor: Initialize Map Check Nodes", async () =>
    {
        expect(graph.getNode(1)).toEqual( { ID: 1, isCritical: false});
        expect(graph.getNode(2)).toEqual( { ID: 2, isCritical: false});
        expect(graph.getNode(3)).toEqual( { ID: 3, isCritical: true});
        expect(graph.getNode(88)).toEqual( { ID: 88, isCritical: false});
        expect(graph.getNode(4)).toEqual( undefined);
    });

    it("Constructor: Initialize Map Check Edges", async () =>
    {
        expect(graph.GetEdges(1)).toEqual(
          [{ weight: 1, startNode: { ID: 1, isCritical: false}, endNode: { ID: 2, isCritical: false}}
              , { weight: 3, startNode: { ID: 1, isCritical: false}, endNode: { ID: 3, isCritical: true}}
              , { weight: 7, startNode: { ID: 1, isCritical: false}, endNode: { ID: 88, isCritical: false}}]);

        expect(graph.GetEdges(2)).toEqual(
          [{ weight: 1, startNode: { ID: 1, isCritical: false}, endNode: { ID: 2, isCritical: false}}
              , { weight: 1, startNode: { ID: 2, isCritical: false}, endNode: { ID: 3, isCritical: true}}]);

        expect(graph.GetEdges(3)).toEqual(
          [{ weight: 3, startNode: { ID: 1, isCritical: false}, endNode: { ID: 3, isCritical: true}}
              , { weight: 1, startNode: { ID: 2, isCritical: false}, endNode: { ID: 3, isCritical: true}}
              , { weight: 1, startNode: { ID: 3, isCritical: true}, endNode: { ID: 88, isCritical: false}}]);

        expect(graph.GetEdges(88)).toEqual(
          [{ weight: 7, startNode: { ID: 1, isCritical: false}, endNode: { ID: 88, isCritical: false}}
              , { weight: 1, startNode: { ID: 3, isCritical: true}, endNode: { ID: 88, isCritical: false}}]);
    });

    it("GetGraph: test basic get graph", () =>
    {
        expect(map.GetGraph()).not.toEqual(undefined);
    });

    it("AddGroup: CheckIfGroupWasAdded", () =>
    {
        const node = graph.getNode(1);
        map.AddGroup({ID: 0, currentNode: node});
        expect(map.IsGroupOnNode(node)).toBe(true);
        expect(map.IsGroupOnNode(graph.getNode(22))).toBe(false);
    });

    it("SetPlayer: Set player and Get Player", () =>
    {
        const node = graph.getNode(1);
        const player = {ID: 0, currentNode: node};
        map.SetPlayer(player);
        expect(map.GetPlayer()).toBe(player);
    });
});
