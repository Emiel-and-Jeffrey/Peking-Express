import { IMapRequest } from "../../src/interfaces";
import { GameMap } from "../../src/classes/game-map.class";
import { Graph } from "../../src/classes/graph.class";
import { AStarService } from "../../src/services/a-star.service";
import { PeekingController } from "../../src/controllers/peeking.controller";
import { PeekingService } from "../../src/services/peeking.service";
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
  const map: GameMap = new GameMap(mapRequest);
  const graph: Graph = map.GetGraph();
  let service: AStarService;

  beforeEach(async () =>
  {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
          AStarService,
      ],
    }).compile();

    service = module.get<AStarService>(AStarService);
  });

  it("GetPath: Get the shortest path",  () =>
  {
    const route = service.GetPath(map, graph.getNode(1), graph.getNode(88), 29);

    expect(route).toEqual(
      [{ weight: 1, startNode: { ID: 1, isCritical: false}, endNode: { ID: 2, isCritical: false}}
        , { weight: 1, startNode: { ID: 2, isCritical: false}, endNode: { ID: 3, isCritical: true}}
        , { weight: 1, startNode: { ID: 3, isCritical: true}, endNode: { ID: 88, isCritical: false}}]);
  });

  it("GetPath: Empty path",  () =>
  {
    const route = service.GetPath(map, graph.getNode(1), graph.getNode(1), 9);

    expect(route).toEqual([]);
  });

  it("GetPath: Path with no budget",  () =>
  {
    const route = service.GetPath(map, graph.getNode(1), graph.getNode(88), -9);

    expect(route).toEqual([]);
  });
});
