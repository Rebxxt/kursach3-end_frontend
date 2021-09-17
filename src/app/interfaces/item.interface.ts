import {OrderInterface} from "./order.interface";
import {OrderItemInterface} from "./order-item.interface";

export interface ItemInterface {
  id: number
  counter: number
  item: string
  code: string
  isFragile: boolean
  isSunlightDamaged: boolean
  isMoistureDamaged: boolean
  isTemperatureDamaged: boolean
  minTemperature: number | null
  maxTemperature: number | null
  order: number | OrderInterface | null
  editor: boolean | null
  itemOrder: OrderItemInterface
}
