import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ReusableModalComponent } from '../reusable-modal/reusable-modal.component';
import { map, startWith } from 'rxjs/operators';
import { IButtonModel } from '../button/button.model';

@Component({
  selector: 'app-incident-form',
  templateUrl: './incident-form.component.html',
  styleUrls: ['./incident-form.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class IncidentFormComponent implements OnInit {
  public incidentForm: FormGroup;
  public btnDeleteIncident: any;
  public btnRegisterIncident: any;

  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  public severityRange = [
    { value: '1', viewValue: 'Menor' },
    { value: '2', viewValue: 'Mayor' },
    { value: '3', viewValue: 'Grave' },
  ];
  public severityType = [
    { value: '1', viewValue: 'Tipo 1' },
    { value: '2', viewValue: 'Tipo 2' },
    { value: '3', viewValue: 'Tipo 3' },
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ReusableModalComponent>
  ) {}

  ngOnInit(): void {
    this.configForm();
    this.btnDeleteIncident = this.configButton('Eliminar incidencia');
    this.btnRegisterIncident = this.configButton('Registrar incidencia');
  }

  public configForm() {
    this.incidentForm = this.fb.group({
      datePickerTask: new FormControl(null),
      severitySelect: new FormControl(null),
      severityTypeSelect: new FormControl(null),
      notification: new FormControl(null),
      datePickerOpening: new FormControl(null),
      responsiblePerson: new FormControl(null),
      textArea: new FormControl(null),
    });
  }

  public filterAutocomplete() {
    this.filteredOptions = this.incidentForm
      .get('responsiblePerson')
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  public configButton(text: string): IButtonModel {
    return {
      text: text,
    };
  }

  cancelForm() {
    this.dialogRef.close();
  }
}
