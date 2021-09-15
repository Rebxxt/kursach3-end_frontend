import { Component, OnInit } from '@angular/core';
import {OrderService} from "../services/order.service";
import {FormControl} from "@angular/forms";
import {OrderInterface} from "../interfaces/order.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: OrderInterface[] = []
  displayedColumns: string[] = ['id', 'address', 'phone'];

  constructor(
    private orderService: OrderService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getOrders()
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
