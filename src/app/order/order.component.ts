import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from "../services/order.service";
import {FormControl} from "@angular/forms";
import {OrderInterface} from "../interfaces/order.interface";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Subscription} from "rxjs";
import {UserInterface} from "../interfaces/user.interface";
import {RoleInterface} from "../interfaces/role.interface";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {

  orders: OrderInterface[] = []
  displayedColumns: string[] = ['id', 'address', 'phone'];

  subscriptions: Subscription = new Subscription()
  profile: UserInterface | null = null;
  isManager: boolean = false

  constructor(
    private orderService: OrderService,
    private router: Router,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.getOrders()
    this.subscriptions.add(
      this.auth.profile.subscribe(profile => {
        this.profile = profile;
        this.isManager = this.profile?.roles?.find(role => (role.role as RoleInterface).role == 'manager') != null;
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  getOrders() {
    this.orderService.getOrders().subscribe(response => {
      this.orders = response as OrderInterface[]
    })
  }

  createOrder() {
    this.router.navigate(['order', 'create'])
  }
}
