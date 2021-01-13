import { Component, OnInit } from '@angular/core';
import { IncidentFormComponent } from 'src/app/components/incident-form/incident-form.component';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.less'],
})
export class HomeViewComponent implements OnInit {
  constructor(private _materialModule: MaterialModule) {}

  ngOnInit(): void {}

  public openModalForm() {
    this._materialModule.openModal(
      {
        class: 'modalLg',
        title: 'Crear incidencia',
        formContent: '',
      },
      IncidentFormComponent
    );
  }
}
