import { LocationInterface } from "./location.interface";
import { ConnectionInterface } from "./connection.interface";

export interface IMapRequest
{
    locations: LocationInterface;
    connections: ConnectionInterface;
}
