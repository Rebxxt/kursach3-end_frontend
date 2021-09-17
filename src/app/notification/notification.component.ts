import { Component, OnInit } from '@angular/core';
import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  title: string = '';
  content: string = '';
  showNotify: boolean = false;

  constructor(
    private notifyService: NotificationService
  ) { }

  ngOnInit(): void {
  }

}
