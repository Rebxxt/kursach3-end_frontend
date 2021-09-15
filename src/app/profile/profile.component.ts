import {Component, OnInit} from '@angular/core';
import {UserInterface} from "../interfaces/user.interface";
import {AuthService} from "../services/auth.service";
import {UserEditorService} from "../services/user-editor.service";
import {FormControl} from "@angular/forms";
import {PhoneInterface} from "../interfaces/phone.interface";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: UserInterface | null = null

  showPhoneEditor: boolean = false
  phoneControl: FormControl = new FormControl();

  constructor(
    private authService: AuthService,
    private userEditor: UserEditorService,
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

  openPhoneInput() {
    this.showPhoneEditor = !this.showPhoneEditor
  }

  addUserProne() {
    this.userEditor.addUserPhone(this.phoneControl.value, this.profile as UserInterface).subscribe(response => {
      this.profile?.phones?.push(response as PhoneInterface)
    })
  }

  deleteUserPhone(phoneId: number, index: number) {
    this.userEditor.deleteUserPhone(phoneId).subscribe(response => {
      this.profile?.phones?.splice(index, 1)
    })
  }
}
