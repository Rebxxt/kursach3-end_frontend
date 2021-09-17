import {OrderInterface} from "./order.interface";
import {BuildInterface} from "./build.interface";
import {UserInterface} from "./user.interface";
import {TransportInterface} from "./transport.interface";


export interface OrderStatusInterface {
  status: string | null
  id: number | null
}

export interface OrderHistoryInterface {
  order: OrderInterface | number | null
  build: BuildInterface | null
  carries: UserInterface | null
  transport: TransportInterface | null
  id: number | null
  queue: number | null
  status: OrderStatusInterface | null
}
