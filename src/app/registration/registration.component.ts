import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  auth_form = new FormGroup({
    'firstName': new FormControl(''),
    'secondName': new FormControl(''),
    'login': new FormControl(''),
    'password': new FormControl(''),
    'password_repeat': new FormControl(''),
  })

  ngOnInit(): void {
  }

  auth(): void {
    const login = this.auth_form.controls['login'].value
    const password = this.auth_form.controls['password'].value
    this.authService.registration(login, password).subscribe(profile => {
      this.router.navigate(['/'])
    })
  }

}
