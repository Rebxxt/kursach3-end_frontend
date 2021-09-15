import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserInterface} from "../interfaces/user.interface";
import {AuthService} from "../services/auth.service";
import {UserEditorService} from "../services/user-editor.service";
import {FormControl} from "@angular/forms";
import {PhoneInterface} from "../interfaces/phone.interface";
import {Subscription} from "rxjs";
import {AddressInterface} from "../interfaces/address.interface";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  profile: UserInterface | null = null

  showPhoneEditor: boolean = false
  showAddressEditor: boolean = false;
  phoneControl: FormControl = new FormControl();
  addressControl: FormControl = new FormControl();

  subscription: Subscription = new Subscription()

  constructor(
    private authService: AuthService,
    private userEditor: UserEditorService,
  ) {
  }

  ngOnInit(): void {
    this.subscription.add(this.authService.profile.subscribe(profile => {
        if (profile != null) {
          this.profile = profile
        } else {
          this.authService.current().subscribe(
            profile => this.profile = profile.body,
            error => this.profile = null)
        }
      })
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  openPhoneInput() {
    this.showPhoneEditor = !this.showPhoneEditor
  }

  openAddressInput() {
    this.showAddressEditor = !this.showAddressEditor
  }

  addUserProne() {
    this.userEditor.addUserPhone(this.phoneControl.value, this.profile as UserInterface).subscribe(response => {
      this.profile?.phones?.push(response as PhoneInterface)
    })
  }

  addUserAddress() {
    this.userEditor.addUserAddress(this.addressControl.value, this.profile as UserInterface).subscribe(response => {
      this.profile?.addresses?.push(response as AddressInterface)
    })
  }

  deleteUserPhone(phoneId: number, index: number) {
    this.userEditor.deleteUserPhone(phoneId).subscribe(response => {
      this.profile?.phones?.splice(index, 1)
    })
  }

  deleteUserAddress(addressId: number, index: number) {
    this.userEditor.deleteUserAddress(addressId).subscribe(response => {
      this.profile?.addresses?.splice(index, 1)
    })
  }
}
