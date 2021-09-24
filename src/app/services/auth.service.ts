import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserInterface} from "../interfaces/user.interface";
import {BehaviorSubject, Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public profile: BehaviorSubject<UserInterface | null> = new BehaviorSubject<UserInterface | null>(null)
  public setProfile(user: UserInterface | null) {
    this.profile.next(user);
  }

  constructor(
    private http: HttpClient,
  ) {
    this.current().subscribe()
  }

  setLocal(cookie: string) {
    localStorage.setItem('cookie', cookie)
  }

  login(login: string, password: string): Observable<any> {
    return this.http.post<UserInterface>('/api/auth/login/', {login, password}, {observe: 'response'})
      .pipe(tap((response) => {
        let temp = response.headers.getAll('set-cookie');
        this.setProfile(response.body as UserInterface);
      }))
  }

  registration(login: string, password: string, firstName: string, lastName: string) {
    return this.http.post<UserInterface>('/api/auth/registration/', {login, password, firstName, lastName}, {observe: 'response'})
      .pipe(tap(response => {
        this.setProfile(response.body as UserInterface);
      }))
  }

  logout() {
    return this.http.get<UserInterface>('/api/auth/logout/', {observe: 'response'})
      .pipe(tap(response => {
        this.setProfile(null);
      }))
  }

  current() {
    return this.http.get<UserInterface>('/api/auth/current/', {observe: 'response'})
      .pipe(tap(response => {
        this.setProfile(response.body as UserInterface);
      }))
  }
}
