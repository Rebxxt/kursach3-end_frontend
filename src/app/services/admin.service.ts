import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

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
}
