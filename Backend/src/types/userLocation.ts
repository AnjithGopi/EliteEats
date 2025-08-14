import { LocationData } from "./LocationData";

export interface UserLocation {
  location: LocationData;
  timestamp: Date;
  userId?:string
}
