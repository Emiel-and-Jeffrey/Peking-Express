import { Graph } from "./graph.class";
import { GraphNode, Group, IMapRequest } from "../interfaces";

export class GameMap
{
   private readonly graph: Graph;
   private readonly groups: Group[];
   private player: Group;

   public constructor(mapRequest: IMapRequest)
   {
      const maxNodes = 88;

      this.groups = [];
      this.graph = new Graph();
      for (let i: number = 1; i <= mapRequest.locations.number; i++)
      {
         const ID = i === mapRequest.locations.number ? maxNodes : i;
         this.graph.addNode({
            ID: ID,
            isCritical: mapRequest.locations.critical.includes(ID)
         });
      }

      for (let i: number = 0; i < mapRequest.connections.price.length; i++)
      {
         this.graph.addEdge({
            weight: mapRequest.connections.price[i],
            startNode: this.graph.getNode(mapRequest.connections.source[i]),
            endNode: this.graph.getNode(mapRequest.connections.target[i])
         });
      }
   }

   public  GetGraph(): Graph
   {
     return this.graph;
   }

   public AddGroup(group: Group): void
   {
      this.groups.push(group);
   }

   public SetPlayer(group: Group): void
   {
      this.player = group;
   }

   public GetPlayer(): Group
   {
      return this.player;
   }

   public IsGroupOnNode(node: GraphNode): boolean
   {
      for (const group of this.groups)
      {
         if (group.currentNode === node)
         {
            return true;
         }
      }
      return false;
   }

}