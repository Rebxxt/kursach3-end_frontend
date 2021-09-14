import {Component, OnInit} from '@angular/core';
import {UserInterface} from "../interfaces/user.interface";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: UserInterface | null = null

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.authService.profile.subscribe(profile => {
      if (profile != null) {
        this.profile = profile
      } else {
        this.authService.current().subscribe(
          profile => this.profile = profile.body,
          error => this.profile = null)
      }
    })
  }

}
