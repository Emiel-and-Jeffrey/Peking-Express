import { IMapRequest } from "../../src/interfaces";
import { GameMap } from "../../src/classes/game-map.class";
import { Graph } from "../../src/classes/graph.class";
import { AStarService } from "../../src/services/a-star.service";
import { Test, TestingModule } from "@nestjs/testing";

describe("A star service", () =>
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
  let service: AStarService;

  beforeEach(async () =>
  {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
          AStarService,
      ],
    }).compile();

    service = module.get<AStarService>(AStarService);
    map = new GameMap(mapRequest);
    graph = map.GetGraph();
  });

  it("GetPath: Get the shortest path",  () =>
  {
    const route = service.GetPath(map, graph.GetNode(1), graph.GetNode(88), 29);

    expect(route).toEqual(
      [{ weight: 1, startNode: { ID: 1, isCritical: false}, endNode: { ID: 2, isCritical: false}}
        , { weight: 1, startNode: { ID: 2, isCritical: false}, endNode: { ID: 3, isCritical: true}}
        , { weight: 1, startNode: { ID: 3, isCritical: true}, endNode: { ID: 88, isCritical: false}}]);
  });

  it("GetPath: Empty path",  () =>
  {
    const route = service.GetPath(map, graph.GetNode(1), graph.GetNode(1), 9);

    expect(route).toEqual([]);
  });

  it("GetPath: Path with no budget",  () =>
  {
    const route = service.GetPath(map, graph.GetNode(1), graph.GetNode(88), -9);

    expect(route).toEqual([]);
  });

  it("GetPath: Group on critical node",  () =>
  {
    map.AddGroup({ID: 0, currentNode: graph.GetNode(3) });
    const route = service.GetPath(map, graph.GetNode(1), graph.GetNode(88), 9);

    expect(route).toEqual(
      [{ weight: 7, startNode: { ID: 1, isCritical: false}, endNode: { ID: 88, isCritical: false}}]);
  });

  it("GetPath: Group to critical end node with group",  () =>
  {
    map.AddGroup({ID: 0, currentNode: graph.GetNode(3) });
    const route = service.GetPath(map, graph.GetNode(1), graph.GetNode(3), 9);

    expect(route).toEqual(
      []);
  });

  it("GetPath: Group to critical end node without group",  () =>
  {
    const route = service.GetPath(map, graph.GetNode(1), graph.GetNode(3), 9);

    expect(route).toEqual(
      [{ weight: 1, startNode: { ID: 1, isCritical: false}, endNode: { ID: 2, isCritical: false}},
                { weight: 1, startNode: { ID: 2, isCritical: false}, endNode: { ID: 3, isCritical: true}}]);
  });

  it("GetPath: Groups on random nodes on non critical nodes",  () =>
  {
    const route = service.GetPath(map, graph.GetNode(1), graph.GetNode(88), 29);
    map.AddGroup({ID: 0, currentNode: graph.GetNode(2) });
    map.AddGroup({ID: 1, currentNode: graph.GetNode(1) });
    expect(route).toEqual(
      [{ weight: 1, startNode: { ID: 1, isCritical: false}, endNode: { ID: 2, isCritical: false}}
        , { weight: 1, startNode: { ID: 2, isCritical: false}, endNode: { ID: 3, isCritical: true}}
        , { weight: 1, startNode: { ID: 3, isCritical: true}, endNode: { ID: 88, isCritical: false}}]);
  });
});
