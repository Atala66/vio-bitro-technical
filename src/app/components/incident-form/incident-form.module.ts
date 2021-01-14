import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentFormComponent } from './incident-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ButtonModule } from '../button/button.module';
import { IncidentFormService } from './incident-form.service';
import { SuccessNotificationModule } from '../success-notification/success-notification.module';

@NgModule({
  declarations: [IncidentFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatAutocompleteModule,
    EditorModule,
	ButtonModule,
	SuccessNotificationModule
  ],
  providers: [
	IncidentFormService
  ],
  exports: [IncidentFormComponent],
})
export class IncidentFormModule {}
