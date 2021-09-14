import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }

  create(role: string) {
    return this.http.post('/api/role/', {role}, {
      withCredentials: true,})
  }
}
