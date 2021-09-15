import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {OrderInterface} from "../interfaces/order.interface";
import {OrderService} from "../services/order.service";
import {ItemInterface} from "../interfaces/item.interface";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-item-storage',
  templateUrl: './item-storage.component.html',
  styleUrls: ['./item-storage.component.css']
})
export class ItemStorageComponent implements OnInit {
  itemCreatorForm: FormGroup = new FormGroup({
    item: new FormControl(''),
    code: new FormControl(''),
    isFragile: new FormControl(false),
    isSunlightDamaged: new FormControl(false),
    isMoistureDamaged: new FormControl(false),
    isTemperatureDamaged: new FormControl(false),
    minTemperature: new FormControl(null, [Validators.min(-273.15), Validators.max(1000)]),
    maxTemperature: new FormControl(null, [Validators.min(-273.15), Validators.max(1000)]),
    order: new FormControl()
  });
  orders: OrderInterface[] = [];
  items: MatTableDataSource<ItemInterface> = new MatTableDataSource<ItemInterface>([]);
  displayedColumns: string[] = ['id', 'code', 'item', 'isFragile', 'isSunlightDamaged', 'isMoistureDamaged',
    'isTemperatureDamaged', 'minTemperature', 'maxTemperature', 'order', 'editor', 'save'];
  itemsForm = new FormGroup({
    'items': new FormArray([])
  })
  itemArrayForm: FormArray = new FormArray([])

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.getOrders()
    this.getItems()
  }

  getOrders() {
    this.orderService.getOrders().subscribe(response => {
      this.orders = response as OrderInterface[]
      this.orders.unshift({id: null, client: null, actualPhone: null, actualAddress: null} as OrderInterface)
      this.itemCreatorForm.controls.order.setValue(this.orders[0])
    })
  }

  getItems() {
    this.orderService.getItems().subscribe(response => {
      this.items.data = response as ItemInterface[]
      this.itemArrayForm = this.itemsForm.controls['items'] as FormArray
      for (let item of this.items.data) {
        this.itemArrayForm.controls.push(this.getItemGroup(item))
      }
    })
  }

  createItem() {
    this.orderService.createItem(this.itemCreatorForm.value).subscribe(r => {
      const item = r as ItemInterface
      this.items.data = [item, ...this.items.data]
      this.itemArrayForm.controls.unshift(this.getItemGroup(item))
    })
  }

  getItemGroup(item: ItemInterface) {
    return new FormGroup({
      id: new FormControl(item.id),
      code: new FormControl(item.code),
      item: new FormControl(item.item),
      isFragile: new FormControl(item.isFragile),
      isSunlightDamaged: new FormControl(item.isSunlightDamaged),
      isMoistureDamaged: new FormControl(item.isMoistureDamaged),
      isTemperatureDamaged: new FormControl(item.isTemperatureDamaged),
      minTemperature: new FormControl(item.minTemperature),
      maxTemperature: new FormControl(item.maxTemperature),
      order: new FormControl(item.order),
      editor: new FormControl(false),
    })
  }

  setEditMode(editorId: number) {
    const control = ((this.itemArrayForm.controls[editorId] as FormArray)!.controls as any).editor
    control.setValue(!control.value)
  }

  save(i: number) {
    const value = (this.itemArrayForm.controls[i] as FormArray)!.value
    if (!value.isTemperatureDamaged) {
      value.maxTemperature = null
      value.minTemperature = null
    }
    this.orderService.updateItems(value).subscribe();
    (this.itemArrayForm.controls[i] as FormGroup).controls.editor.setValue(false);
    this.itemArrayForm.controls[i].markAsPristine();
    let tableValue = this.items.data[i];
    tableValue.item = value.item
    tableValue.code = value.code
    tableValue.isFragile = value.isFragile
    tableValue.isMoistureDamaged = value.isMoistureDamaged
    tableValue.isTemperatureDamaged = value.isTemperatureDamaged
    tableValue.isSunlightDamaged = value.isSunlightDamaged
    tableValue.maxTemperature = value.maxTemperature
    tableValue.minTemperature = value.minTemperature
  }
}
