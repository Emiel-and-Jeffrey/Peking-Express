import { Graph } from "./graph.class";
import { GraphNode, Group, IMapRequest } from "../interfaces";

export class GameMap {
  private readonly graph: Graph;
  private groups: Group[];
  private player: Group;

  /**
   * Initalize the map based on map request
   * @param mapRequest the map you want this to be modeled after
   */
  public constructor(mapRequest: IMapRequest) {
    const maxNodes = 88;

    this.groups = [];
    this.graph = new Graph();
    for (let i: number = 1; i <= mapRequest.locations.number; i++) {
      const ID = i === mapRequest.locations.number ? maxNodes : i;
      this.graph.AddNode({
        ID: ID,
        isCritical: mapRequest.locations.critical.includes(ID),
      });
    }

    for (let i: number = 0; i < mapRequest.connections.price.length; i++) {
      this.graph.AddEdge({
        weight: mapRequest.connections.price[i],
        startNode: this.graph.GetNode(mapRequest.connections.source[i]),
        endNode: this.graph.GetNode(mapRequest.connections.target[i]),
      });
    }
  }

  /**
   * Get the graph for this map
   */
  public GetGraph(): Graph {
    return this.graph;
  }

  /**
   * Add a group to the map
   * @param group the group you want to add
   */
  public AddGroup(group: Group): void {
    this.groups.push(group);
  }

  /**
   * Get a specific group by id. If not found undefined will be returned.
   * @param id the group ID
   * @private
   */
  private GetGroup(id: number): Group {
    for (const group of this.groups) {
      if (group.ID === id) {
        return group;
      }
    }
    return undefined;
  }

  /**
   * Move a group to a location. If the group was not added this will be done for you.
   * @param id the group ID
   * @param nodeID the node ID
   */
  public MoveGroup(id: number, nodeID: number): void {
    let group: Group = this.GetGroup(id);
    if (group === undefined) {
      group = { ID: id, currentNode: undefined };
      this.groups.push(group);
    }

    group.currentNode = this.graph.GetNode(nodeID);
  }

  /**
   * Move a group to a location. If the group was not added this will be done for you.
   * @param locations the group locations
   */
  public SetGroupPositions(locations: number[]): void {
    this.groups = [];
    for (const location of locations) {
      this.groups.push({ID: this.groups.length,  currentNode: this.graph.GetNode(location)} );
    }
  }

  /**
   * Set the player on the map
   * @param group the player
   */
  public SetPlayer(group: Group): void {
    this.player = group;
  }

  /**
   * Get the player
   */
  public GetPlayer(): Group {
    return this.player;
  }

  /**
   * Check if a group is on a specific node
   * @param node the node you want to check
   */
  public IsGroupOnNode(node: GraphNode): boolean {
    for (const group of this.groups) {
      if (group.currentNode === node) {
        return true;
      }
    }
    return false;
  }

}