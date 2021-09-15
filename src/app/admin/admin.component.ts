import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {AdminService} from "../services/admin.service";
import {RoleInterface} from "../interfaces/role.interface";
import {TransportTypeInterface} from "../interfaces/transport.interface";
import {BuildInterface} from "../interfaces/build.interface";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  roleControls: FormArray = new FormArray([])
  buildControls: FormArray = new FormArray([])
  transportTypeControls: FormArray = new FormArray([])

  formGroup = new FormGroup({
    role: new FormControl(''),
    build: new FormControl(''),
    transportType: new FormControl(''),
    roles: new FormArray([]),
    builds: new FormArray([]),
    transportTypes: new FormArray([]),
  })

  constructor(
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.getTransport()
    this.getRoles()
    this.getBuilds()
  }

  private getRoles() {
    this.adminService.getRoles().subscribe(response => {
      this.roleControls = this.formGroup.controls.roles as FormArray
      for (let role of (response as RoleInterface[])) {
        this.roleControls.push(new FormGroup({
          role: new FormControl(role.role),
          isBase: new FormControl(role.isBase),
          id: new FormControl(role.id),
        }))
      }
    });
  }

  private getBuilds() {
    this.adminService.getBuildTypes().subscribe(response => {
      this.buildControls = this.formGroup.controls.builds as FormArray;
      for (let build of (response as BuildInterface[])) {
        this.buildControls.push(new FormGroup({
          type: new FormControl(build.type),
          isBase: new FormControl(build.isBase),
          id: new FormControl(build.id),
        }))
      }
    });
  }

  private getTransport() {
    this.adminService.getTransportType().subscribe(response => {
      this.transportTypeControls = this.formGroup.controls.transportTypes as FormArray;
      for (let type of (response as TransportTypeInterface[])) {
        this.transportTypeControls.push(new FormGroup({
          type: new FormControl(type.type),
          isBase: new FormControl(type.isBase),
          id: new FormControl(type.id),
        }))
      }
    });
  }

  createRole() {
    this.adminService.createRole(this.formGroup.controls.role.value).subscribe((response) => {
      const role = response as RoleInterface
      this.roleControls?.push(new FormGroup({
        role: new FormControl(role.role),
        isBase: new FormControl(role.isBase),
        id: new FormControl(role.id),
      }))
      this.formGroup.controls.role.reset()
    })
  }

  createBuild() {
    this.adminService.createBuild(this.formGroup.controls.build.value).subscribe((response) => {
      const build = response as BuildInterface
      this.buildControls.push(new FormGroup({
        type: new FormControl(build.type),
        isBase: new FormControl(build.isBase),
        id: new FormControl(build.id),
      }))
      this.formGroup.controls.build.reset()
    })
  }

  createTransportType() {
    this.adminService.createTransportType(this.formGroup.controls.transportType.value).subscribe((response) => {
      const transportType = response as TransportTypeInterface
      this.transportTypeControls.push(new FormGroup({
        type: new FormControl(transportType.type),
        isBase: new FormControl(transportType.isBase),
        id: new FormControl(transportType.id),
      }))
      this.formGroup.controls.transportType.reset()
    })
  }

  removeRole(id: number, index: number) {
    this.adminService.deleteRole(id).subscribe(response => {
      this.roleControls?.removeAt(index)
    })
  }

  removeBuild(id: number, index: number) {
    this.adminService.deleteBuild(id).subscribe(response => {
      this.buildControls.removeAt(index)
    })
  }

  removeTransportType(id: number, index: number) {
    this.adminService.deleteTransportType(id).subscribe(response => {
      this.transportTypeControls.removeAt(index)
    })
  }

  updateRole(role: RoleInterface, index: number) {
    this.adminService.updateRole(role).subscribe(response => {
      this.roleControls?.controls[index].setValue(response);
      this.roleControls?.controls[index].markAsPristine()
    })
  }

  updateBuild(build: BuildInterface, index: number) {
    this.adminService.updateBuild(build).subscribe(response => {
      this.buildControls?.controls[index].setValue(response);
      this.buildControls?.controls[index].markAsPristine()
    })
  }

  updateTransportType(transportType: TransportTypeInterface, index: number) {
    this.adminService.updateTransportType(transportType).subscribe(response => {
      this.transportTypeControls?.controls[index].setValue(response);
      this.transportTypeControls?.controls[index].markAsPristine()
    })
  }
}
