import {UserInterface} from "./user.interface";

export interface RoleInterface {
  user_has_role: boolean | null
  role: string
  isBase: boolean | null
  id: number
}

export interface RoleUserInterface {
  role: RoleInterface | null
  id: number;
  user: UserInterface | null

}
