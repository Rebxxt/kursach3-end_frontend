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
import {ItemInterface} from "../interfaces/item.interface";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "../services/order.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit, OnDestroy {

  items: ItemInterface[] = []

  users: UserInterface[] = []
  currentUser: UserInterface | null = null;
  disableSelectUser: boolean = false

  currentAddress: AddressInterface | null = null
  currentPhone: PhoneInterface | null = null;

  subscriptions: Subscription = new Subscription()
  itemsForm: FormGroup = new FormGroup({
    items: new FormArray([])
  });
  itemArrayForm: FormArray = new FormArray([]);
  hasSelected: boolean = false;

  constructor(
    private userEditor: UserEditorService,
    private adminService: AdminService,
    private auth: AuthService,
    private orderService: OrderService,
    private router: Router,
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

    this.getItems()
  }

  getItems() {
    this.orderService.getItems().subscribe(response => {
      this.items = response as ItemInterface[]
      this.itemArrayForm = this.itemsForm.controls.items as FormArray
      for (let item of this.items) {
        this.itemArrayForm.push(new FormGroup({
          select: new FormControl(false, [Validators.required]),
          id: new FormControl(item.id, [Validators.required]),
          counter: new FormControl(0, [Validators.required]),
        }))
      }
    })
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

  createOrder() {
    let items = []
    const array = this.itemArrayForm.value
    for (let i = 0; i < array.length; i++) {
      if (array[i].select) {
        items.push({
          id: this.items[i].id,
          counter: array[i].counter
        })
      }
    }
    if (this.currentUser && this.currentPhone && this.currentAddress)
      this.orderService.createOrder(items, this.currentUser, this.currentPhone, this.currentAddress).subscribe(response => {
        this.router.navigate(['/', 'order'])
      })

  }

  selectItem() {
    for (let item of this.itemArrayForm.value) {
      if (item.select) {
        this.hasSelected = true
        return
      }
    }
    this.hasSelected = false
  }
}
