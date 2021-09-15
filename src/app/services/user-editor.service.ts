import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RoleInterface} from "../interfaces/role.interface";
import {UserInterface} from "../interfaces/user.interface";
import {UserTransportInterface} from "../interfaces/user-transport.interface";
import {PhoneInterface} from "../interfaces/phone.interface";

@Injectable({
  providedIn: 'root'
})
export class UserEditorService {

  constructor(
    private http: HttpClient,
  ) { }

  getUsers() {
    return this.http.get('/api/user/')
  }

  changeRole(role: RoleInterface, user: UserInterface) {
    if (role.user_has_role)
      return this.http.post('/api/user-role/', {user: user.id, role: role.id})
    else {
      const userRoleId = (user.roles?.find((userRole: any) => userRole.role.id == role.id) as any).id
      console.log(user.roles)
      return this.http.delete(`/api/user-role/${userRoleId}/`)
    }
  }

  updateUserTransport(transports: UserTransportInterface[], user: UserInterface) {
    return this.http.patch(`/api/user-transport/multiset/`, {transports, user: user.id})
  }

  addUserPhone(phone: string, user: UserInterface) {
    return this.http.post('/api/phone/', {phone, user: user.id})
  }

  deleteUserPhone(phoneId: number) {
    return this.http.delete(`/api/phone/${phoneId}`)
  }
}
