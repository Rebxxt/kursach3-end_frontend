import { Component, OnInit } from '@angular/core';
import {OrderService} from "../services/order.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
  }
}
