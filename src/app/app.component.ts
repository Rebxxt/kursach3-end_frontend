import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {UserInterface} from "./interfaces/user.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kursach3end';
  profile: UserInterface | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.authService.profile.subscribe(res => {
      this.profile = res
    })
  }

  logout() {
    this.authService.logout().subscribe(res => {
      this.router.navigate(['/'])
    })
  }

  checkRole(role: string) {
    return this.profile != null && this.profile.roles != null && this.profile.roles.find(r => r.role?.role == role) != null
  }
}
