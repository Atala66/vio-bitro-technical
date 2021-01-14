import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-notification',
  templateUrl: './success-notification.component.html',
  styleUrls: ['./success-notification.component.less']
})
export class SuccessNotificationComponent implements OnInit {
public SUCCESS_NOTIFICATION = 'Incidencia creada correctamente';

  constructor() { }

  ngOnInit(): void {
  }

}
