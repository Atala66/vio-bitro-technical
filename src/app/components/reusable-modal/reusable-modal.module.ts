import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReusableModalComponent } from './reusable-modal.component';
import { IncidentFormComponent } from '../incident-form/incident-form.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  entryComponents: [IncidentFormComponent],
  declarations: [ReusableModalComponent],
  imports: [CommonModule, MatDialogModule],
  exports: [ReusableModalComponent],
})
export class ReusableModalModule {}
