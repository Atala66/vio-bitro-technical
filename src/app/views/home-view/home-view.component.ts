import { Component, OnInit } from '@angular/core';
import { IButtonModel } from 'src/app/components/button/button.model';
import { IncidentFormComponent } from 'src/app/components/incident-form/incident-form.component';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.less'],
})
export class HomeViewComponent implements OnInit {
  public buttonConfig: any;

  constructor(private _materialModule: MaterialModule) {}

  ngOnInit(): void {
    this.buttonConfig = this.configButton();
  }

  public openModalForm() {
    this._materialModule.openModal(
      {
        class: 'modalLg',
		title: 'Crear incidencia',
		formContent: ''
      },
      IncidentFormComponent
    );
  }

  public configButton(): IButtonModel {
    return {
      text: 'Crea una incidencia',
      style: 'green-btn',
    };
  }
}
