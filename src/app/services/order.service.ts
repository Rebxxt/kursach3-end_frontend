import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ItemInterface} from "../interfaces/item.interface";
import {OrderInterface} from "../interfaces/order.interface";
import {UserInterface} from "../interfaces/user.interface";
import {PhoneInterface} from "../interfaces/phone.interface";
import {AddressInterface} from "../interfaces/address.interface";
import {OrderHistoryInterface, OrderStatusInterface} from "../interfaces/order-history.interface";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private http: HttpClient
  ) { }

  getOrders() {
    return this.http.get('/api/order/')
  }

  createItem(item: ItemInterface) {
    return this.http.post('/api/item/', {...item, order: (item.order as OrderInterface).id})
  }

  getItems() {
    return this.http.get('/api/item/')
  }

  updateItems(form: ItemInterface) {
    return this.http.patch(`/api/item/${form.id}/`, form)
  }

  createOrder(items: any[], user: UserInterface, phone: PhoneInterface, address: AddressInterface) {
    return this.http.post('/api/order/', {
      items,
      client: user.id,
      actualPhone: phone.id,
      actualAddress: address.id,
    })
  }

  getOrder(id: number) {
    return this.http.get(`/api/order/${id}/`)
  }

  getOrderHistory(id: number) {
    return this.http.get('/api/order-history/', { params: {'order': id}})
  }

  getOrderStatuses() {
    return this.http.get('/api/order-status/')
  }

  updateOrderStatus(body: any) {
    return this.http.post('api/order-history/', body)
  }
}
