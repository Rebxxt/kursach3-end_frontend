import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {OrderService} from "../services/order.service";
import {AdminService} from "../services/admin.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  formGroup = new FormGroup({
    role: new FormControl(''),
    build: new FormControl(''),
    transportType: new FormControl(''),
  })

  constructor(
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
  }

  createOrder() {
    this.adminService.createRole(this.formGroup.controls['role'].value).subscribe()
  }

  createBuild() {
    this.adminService.createBuild(this.formGroup.controls['build'].value).subscribe()
  }

  createTransportType() {
    this.adminService.createTransportType(this.formGroup.controls['transportType'].value).subscribe()
  }


}
