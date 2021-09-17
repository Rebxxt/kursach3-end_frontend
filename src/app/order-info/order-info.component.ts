import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../services/order.service";
import {OrderInterface} from "../interfaces/order.interface";
import {OrderHistoryInterface, OrderStatusInterface} from "../interfaces/order-history.interface";
import {FormControl} from "@angular/forms";
import {UserInterface} from "../interfaces/user.interface";
import {UserEditorService} from "../services/user-editor.service";
import {UserTransportInterface} from "../interfaces/user-transport.interface";

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.css']
})
export class OrderInfoComponent implements OnInit {
  order: OrderInterface | null = null;
  loaded: boolean = false;

  orderHistory: OrderHistoryInterface[] = []
  historyFinished: boolean = false;
  currentStatus: OrderStatusInterface | null = null;
  statuses: OrderStatusInterface[] = [];
  controlCarries: FormControl = new FormControl();
  carries: UserInterface[] = []
  transports: UserTransportInterface[] = [];
  controlTransports: FormControl = new FormControl();
  orderId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private userEditor: UserEditorService
  ) {
  }

  ngOnInit(): void {
    this.orderId = parseInt(this.route.snapshot.paramMap.get('id')!)
    this.orderService.getOrder(this.orderId).subscribe(response => {
      this.order = response as OrderInterface
    }, () => {
      this.order = null
      this.loaded = true
    })
    this.getOrderHistory()
    this.getStatuses()
    this.getCarries()
  }

  getOrderHistory() {
    this.orderService.getOrderHistory(this.orderId!).subscribe(response => {
      this.orderHistory = response as OrderHistoryInterface[]
      this.historyFinished = this.orderHistory.filter(r => r.status?.status == 'ready').length > 0
    })
  }

  getStatuses() {
    this.orderService.getOrderStatuses().subscribe(r => {
      this.statuses = (r as OrderStatusInterface[]).filter(r => r.status != 'initial')
      this.currentStatus = this.statuses[0]
    })
  }

  getCarries() {
    this.userEditor.getUsers('carrier').subscribe(r => {
      this.carries = r as UserInterface[]
    })
  }

  getTransports(event: any) {
    this.transports = event.transports
  }

  updateStatus() {
    if (this.currentStatus?.status == 'delivery') {
      this.orderService.updateOrderStatus({
        order: this.orderId!,
        carries: this.controlCarries.value.id,
        transport: this.controlTransports.value.id,
        status: this.currentStatus?.id
      }).subscribe(r => {
        this.controlTransports.reset();
        this.controlCarries.reset();
        this.currentStatus = this.statuses[0];
        this.orderHistory.push(r as OrderHistoryInterface)
      })
    } else if (this.currentStatus?.status == 'ready') {

    } else if (this.currentStatus?.status == 'finish_point') {

    } else if (this.currentStatus?.status == 'sort') {

    }
  }
}
