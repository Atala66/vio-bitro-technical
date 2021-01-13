import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  public isMinorSeverity: boolean;
  public isMayorSeverity: boolean;
  public severityTypeOptions: { value: number; viewValue: string }[] = [];

  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  public severityRange = [
    { value: 1, viewValue: 'Menor' },
    { value: 2, viewValue: 'Mayor' },
    { value: 3, viewValue: 'Grave' },
  ];
  public severityTypeMinor = [
    { value: 1, viewValue: 'Tipo 1' },
    { value: 2, viewValue: 'Tipo 2' },
    { value: 3, viewValue: 'Tipo 3' },
  ];

  public severityTypeMayor = [
    { value: 4, viewValue: 'Tipo 4' },
    { value: 5, viewValue: 'Tipo 5' },
    { value: 6, viewValue: 'Tipo 6' },
  ];
  public severityTypeCritical = [
    { value: 7, viewValue: 'Tipo 7' },
    { value: 8, viewValue: 'Tipo 8' },
    { value: 9, viewValue: 'Tipo 9' },
  ];
  public FORM_LABELS = {
    DATE_PICKER_TASK: 'Fecha / Hora de la incidencia',
    SEVERITY_SELECT: 'Severidad',
    SEVERITY_TYPE_SELECT: 'Tipo de incidencia',
    NOTIFICATION: 'Notificar',
    DATE_PICKER_OPENING: 'Fecha / Hora de apertura',
    RESPONSIBLE_PERSON: 'PERSONA',
    NOTES: 'NOTAS',
  };

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ReusableModalComponent>
  ) {}

  ngOnInit(): void {
    this.configForm();
    this.btnDeleteIncident = this.configButton('Eliminar incidencia', 'red-btn');
    this.btnRegisterIncident = this.configButton('Registrar incidencia', 'blue-btn');
    this.filterAutocomplete();
    this.linkDependantSelects();
  }

  get formControls() {
    return this.incidentForm.controls;
  }

  public configForm() {
    this.incidentForm = this.fb.group({
      datePickerTask: new FormControl(null, [Validators.required]),
      severitySelect: new FormControl(null, [Validators.required]),
      severityTypeSelect: new FormControl(null, [Validators.required]),
      notification: new FormControl(null, [Validators.minLength(3)]),
      datePickerOpening: new FormControl(null, [Validators.required]),
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

  public linkDependantSelects() {
    const severityRange = this.incidentForm.get('severitySelect');
    // const severityType = this.incidentForm.get('severityTypeSelect');
    // console.log('severityType::', severityType);
    severityRange.valueChanges.subscribe((sev) => {
      if (severityRange.value === 1) {
        this.isMinorSeverity = true;
        // console.log('menor:: valores 1,2.3');
        this.severityTypeOptions = this.severityTypeMinor;
      }
      if (severityRange.value === 2) {
        this.isMayorSeverity = true;
        // console.log('mayor:: valores 4,5,6');
        this.severityTypeOptions = this.severityTypeMayor;
      }
      if (severityRange.value === 3) {
        // console.log('grave:: valores 7,8,9');
        this.severityTypeOptions = this.severityTypeCritical;
      }
    });
  }

  public configButton(text: string, style: string): IButtonModel {
    return {
      text: text,
      style: style,
    };
  }

  public sendForm() {
    this.incidentForm.value();
  }

  cancelForm() {
    this.dialogRef.close();
  }
}
