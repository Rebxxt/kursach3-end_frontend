import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserInterface} from "../interfaces/user.interface";
import {AuthService} from "../services/auth.service";
import {UserEditorService} from "../services/user-editor.service";
import {UserTransportInterface} from "../interfaces/user-transport.interface";
import {AdminService} from "../services/admin.service";
import {PhoneInterface} from "../interfaces/phone.interface";
import {AddressInterface} from "../interfaces/address.interface";
import {tap} from "rxjs/operators";
import {RoleInterface} from "../interfaces/role.interface";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit, OnDestroy {

  users: UserInterface[] = []
  currentUser: UserInterface | null = null;
  disableSelectUser: boolean = false

  currentAddress: AddressInterface | null = null
  currentPhone: PhoneInterface | null = null;

  subscriptions: Subscription = new Subscription()

  constructor(
    private userEditor: UserEditorService,
    private adminService: AdminService,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(this.auth.profile.subscribe(user => {
      if (user) {
        this.getUsers().subscribe(res => {
          let test = (user as UserInterface)?.roles?.find(role => (role.role as RoleInterface).role == 'manager');
          if (!test) {
            this.users = this.users.filter(user => user.id == this.auth.profile.value?.id)
            this.currentUser = this.users[0]
            this.disableSelectUser = true
          }
        })
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  getUsers() {
    return this.userEditor.getUsers().pipe(tap(response => {
      this.users = response as UserInterface[]
    }))
  }

  selectUser($event: any) {
    this.currentPhone = this.currentUser!.phones![0]
    this.currentAddress = this.currentUser!.addresses![0]
  }

  getAddresses(): AddressInterface[] {
    return this.currentUser?.addresses?.filter(e => e.isActual) as AddressInterface[]
  }
}
