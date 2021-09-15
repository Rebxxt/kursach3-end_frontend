import {RoleInterface, RoleUserInterface} from "./role.interface";
import {UserTransportInterface} from "./user-transport.interface";
import {AddressInterface} from "./address.interface";
import {PhoneInterface} from "./phone.interface";

export interface UserInterface {
  id: number
  username: string
  phones: PhoneInterface[] | null
  addresses: AddressInterface[] | null
  transports: UserTransportInterface[] | null
  groups: string[] | null
  roles: RoleUserInterface[] | null
  firstName: string | null
  lastName: string | null
  email: string | null
  isStaff: boolean | null
  isActive: boolean | null
  isSuperuser: boolean | null
  dateJoined: string | null
  lastLogin: string | null
}
