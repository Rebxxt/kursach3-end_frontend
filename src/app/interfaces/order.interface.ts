import {UserInterface} from "./user.interface";
import {PhoneInterface} from "./phone.interface";
import {AddressInterface} from "./address.interface";
import {ItemInterface} from "./item.interface";

export interface OrderInterface {
  id: number | null
  client: UserInterface | null
  actualPhone: PhoneInterface | null
  actualAddress: AddressInterface | null
  items: ItemInterface[] | null
}
