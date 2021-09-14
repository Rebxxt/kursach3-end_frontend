import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  auth_form = new FormGroup({
    'login': new FormControl(''),
    'password': new FormControl('')
  })

  ngOnInit(): void {
  }

  auth(): void {
    const login = this.auth_form.controls['login'].value
    const password = this.auth_form.controls['password'].value
    this.authService.login(login, password).subscribe(profile => {
      if (profile) {
        this.router.navigate(['/'])
        console.log(profile)
      } else {
        console.log('denied')
      }
    });
  }

}
