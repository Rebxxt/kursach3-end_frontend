import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
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

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('password_repeat')?.value
    return pass === confirmPass ? null : { notSame: true }
  }

  auth_form = new FormGroup({
    'firstName': new FormControl('', [Validators.required]),
    'secondName': new FormControl('', [Validators.required]),
    'login': new FormControl('', [Validators.required]),
    'password': new FormControl('', [Validators.required]),
    'password_repeat': new FormControl('', [Validators.required]),
  }, {validators: [this.checkPasswords]})

  ngOnInit(): void {
  }

  auth(): void {
    const login = this.auth_form.controls['login'].value
    const password = this.auth_form.controls['password'].value
    const firstName = this.auth_form.controls['password'].value
    const lastName = this.auth_form.controls['password'].value
    this.authService.registration(login, password, firstName, lastName).subscribe(profile => {
      this.router.navigate(['/'])
    })
  }

  checkPasswordsMethod() {
    return (this.auth_form.errors != null) && 'notSame' in this.auth_form.errors
  }
}
