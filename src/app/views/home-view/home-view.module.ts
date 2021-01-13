import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeViewComponent } from './home-view.component';
import { ButtonModule } from 'src/app/components/button/button.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IncidentFormModule } from 'src/app/components/incident-form/incident-form.module';

@NgModule({
  declarations: [HomeViewComponent],
  imports: [CommonModule, ButtonModule, FormsModule, ReactiveFormsModule, IncidentFormModule],
  exports: [HomeViewComponent],
})
export class HomeViewModule {}
