import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RoleInterface} from "../interfaces/role.interface";
import {BuildInterface} from "../interfaces/build.interface";
import {TransportTypeInterface} from "../interfaces/transport.interface";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient
  ) { }

  getRoles() {
    return this.http.get('api/role/')
  }

  createRole(role: string) {
    return this.http.post('/api/role/', {role})
  }

  createBuild(type: string) {
    return this.http.post('/api/build/', {type})
  }

  getTransportType() {
    return this.http.get('api/transport-type/')
  }

  createTransportType(type: string) {
    return this.http.post('/api/transport-type/', {type})
  }

  getBuildTypes() {
    return this.http.get('/api/build/')
  }

  deleteRole(id: number) {
    return this.http.delete(`/api/role/${id}/`)
  }

  deleteBuild(id: number) {
    return this.http.delete(`/api/build/${id}/`)
  }

  deleteTransportType(id: number) {
    return this.http.delete(`/api/transport-type/${id}/`)
  }

  updateRole(role: RoleInterface) {
    return this.http.patch(`/api/role/${role.id}/`, role)
  }

  updateBuild(build: BuildInterface) {
    return this.http.patch(`/api/build/${build.id}/`, build)
  }

  updateTransportType(transportType: TransportTypeInterface) {
    return this.http.patch(`/api/transport-type/${transportType.id}/`, transportType)
  }
}
