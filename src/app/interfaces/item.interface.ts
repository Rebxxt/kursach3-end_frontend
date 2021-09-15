import {OrderInterface} from "./order.interface";

export interface ItemInterface {
  id: number
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
}
