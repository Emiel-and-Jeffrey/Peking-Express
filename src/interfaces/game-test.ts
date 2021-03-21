import { IMapRequest } from "./map-request.interface";

export interface IGameTest
{
  map: IMapRequest;
  startLocation: number;
  budget: number;
  players: [[number]];
}
