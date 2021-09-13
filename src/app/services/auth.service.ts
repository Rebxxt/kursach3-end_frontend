import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  auth(login: string, password: string) {
    this.http.post('/api/auth/login/', {login, password}).subscribe(response => {
      console.log(response)
    })
    return {login: 'asdf'}
  }

  registration(login: string, password: string) {
    this.http.post('/api/auth/registration/', {login, password}).subscribe(response => {
      console.log(response)
    })
  }
}
