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
         this.graph.AddNode({
            ID: ID,
            isCritical: mapRequest.locations.critical.includes(ID)
         });
      }

      for (let i: number = 0; i < mapRequest.connections.price.length; i++)
      {
         this.graph.AddEdge({
            weight: mapRequest.connections.price[i],
            startNode: this.graph.GetNode(mapRequest.connections.source[i]),
            endNode: this.graph.GetNode(mapRequest.connections.target[i])
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

   private GetGroup(id: number): Group
   {
      for (const group of this.groups)
      {
         if (group.ID === id)
         {
            return group;
         }
      }
      return undefined;
   }

   public MoveGroup(id: number, nodeID: number): void
   {
      let group: Group = this.GetGroup(id);
      if (group === undefined)
      {
         group = {ID: id, currentNode: undefined};
         this.groups.push(group);
      }

      group.currentNode = this.graph.GetNode(nodeID);
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