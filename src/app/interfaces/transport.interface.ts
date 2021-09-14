import {UserInterface} from "./user.interface";

export interface TransportInterface {
  id: number
  registrationNumber: string
  info: string | null
  user: UserInterface | number
  type: string | null
}

export interface TransportTypeInterface {
  type: string | null
  id: number | null
}
