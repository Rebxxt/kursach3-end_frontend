import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ItemInterface} from "../interfaces/item.interface";
import {OrderInterface} from "../interfaces/order.interface";

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
}
