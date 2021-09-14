import {RoleInterface} from "./role.interface";
import {UserTransportInterface} from "./user-transport.interface";

export interface UserInterface {
  id: number
  username: string
  phones: string[] | null
  addresses: string[] | null
  transports: UserTransportInterface[] | null
  groups: string[] | null
  roles: RoleInterface[] | null
  firstName: string | null
  lastName: string | null
  email: string | null
  isStaff: boolean | null
  isActive: boolean | null
  isSuperuser: boolean | null
  dateJoined: string | null
  lastLogin: string | null
}
