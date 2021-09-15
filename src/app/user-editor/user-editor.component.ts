import {Component, OnInit} from '@angular/core';
import {UserInterface} from "../interfaces/user.interface";
import {UserEditorService} from "../services/user-editor.service";
import {BehaviorSubject} from "rxjs";
import {AbstractControl, FormArray, FormControl, FormGroup} from "@angular/forms";
import {AdminService} from "../services/admin.service";
import {RoleInterface} from "../interfaces/role.interface";
import {tap} from "rxjs/operators";
import {TransportInterface} from "../interfaces/transport.interface";
import {UserTransportInterface} from "../interfaces/user-transport.interface";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.css']
})
export class UserEditorComponent implements OnInit {

  users: BehaviorSubject<UserInterface[]> = new BehaviorSubject<UserInterface[]>([])
  currentUser: UserInterface | null = null;

  roles: BehaviorSubject<RoleInterface[]> = new BehaviorSubject<RoleInterface[]>([])
  transportTypes: BehaviorSubject<TransportInterface[]> = new BehaviorSubject<TransportInterface[]>([])

  userTransportGroup: FormGroup = new FormGroup({
    transports: new FormArray([])
  })
  userTransportGroupArray: FormArray | null = this.userTransportGroup.controls.transports as FormArray

  constructor(
    private userEditor: UserEditorService,
    private adminService: AdminService,
    private auth: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.getUsers().subscribe()
    this.getRoles()
    this.getTransport()
  }

  private getUsers() {
    return this.userEditor.getUsers().pipe(tap((res: any) => {
      if (this.currentUser) {
        this.currentUser = res.find((user: any) => user.id == this.currentUser?.id) as UserInterface
      }
      this.users.next(res as UserInterface[])
    }))
  }

  private getRoles() {
    this.adminService.getRoles().subscribe(response => {
      this.roles.next(response as RoleInterface[])
    })
  }

  private getTransport() {
    this.adminService.getTransportType().subscribe(response => {
      this.transportTypes.next(response as TransportInterface[])
    })
  }

  selectUser($event: any) {
    for (let role of this.roles.value) {
      role.user_has_role = (this.currentUser?.roles?.find((userRole: any) => userRole.role.id == role.id) != undefined)
    }
    this.updateFormArray(this.currentUser?.transports as (UserTransportInterface[] | null))
  }

  updateFormArray(transports: UserTransportInterface[] | null) {
    this.userTransportGroupArray = null
    this.userTransportGroup.removeControl('transports')
    this.userTransportGroup.addControl('transports', new FormArray([]))
    this.userTransportGroupArray = this.userTransportGroup.controls.transports as FormArray
    if (transports != null)
      for (let transport of transports) {
        this.pushToArray(transport)
      }
  }

  public pushToArray(transport: UserTransportInterface | null) {
    this.userTransportGroupArray?.push(new FormGroup({
      registrationNumber: new FormControl(transport?.registrationNumber),
      info: new FormControl(transport?.info),
      type: new FormControl(transport?.type),
      id: new FormControl(transport?.id)
    }))
  }

  changeRole(role: RoleInterface) {
    this.userEditor.changeRole(role, this.currentUser as UserInterface).pipe(tap(res => {
      if (this.currentUser?.id == this.auth.profile.value?.id) {
        this.auth.current().subscribe()
      }
    })).subscribe(response => {
      this.getUsers().subscribe()
    })
  }

  saveTransports() {
    if (this.currentUser)
      this.userEditor.updateUserTransport(this.userTransportGroupArray?.value, this.currentUser).subscribe()
  }

  removeUserTransport(position: number) {
    this.userTransportGroupArray?.removeAt(position)
  }
}
