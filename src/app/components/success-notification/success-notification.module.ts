import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessNotificationComponent } from './success-notification.component';

@NgModule({
  declarations: [SuccessNotificationComponent],
  imports: [CommonModule],
  exports: [SuccessNotificationComponent],
})
export class SuccessNotificationModule {}
