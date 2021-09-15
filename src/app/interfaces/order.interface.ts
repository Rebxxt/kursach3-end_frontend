import {UserInterface} from "./user.interface";
import {PhoneInterface} from "./phone.interface";
import {AddressInterface} from "./address.interface";

export interface OrderInterface {
  id: number
  client: UserInterface
  actualPhone: PhoneInterface
  actualAddress: AddressInterface
}
