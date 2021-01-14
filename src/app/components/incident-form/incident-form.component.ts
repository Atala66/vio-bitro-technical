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
import { IncidentFormService } from './incident-form.service';
import { FORM_LABELS } from '../../constants';

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
  public FORM_LABELS = {
    DATE_PICKER_TASK: 'Fecha / Hora de la incidencia',
    SEVERITY_SELECT: 'Severidad',
    SEVERITY_TYPE_SELECT: 'Tipo de incidencia',
    NOTIFICATION: 'Notificar',
    DATE_PICKER_OPENING: 'Fecha / Hora de apertura',
    RESPONSIBLE_PERSON: 'Persona',
    NOTES: 'Notas',
    REQUIRED_FIELD: 'Campo requerido',
  };

//   public FORM_LABELS = new FORM_LABELS();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  filteredOptionsForReal: Observable<string[]>;

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

  constructor(
    private fb: FormBuilder,
    private _formSrv: IncidentFormService,
    private dialogRef: MatDialogRef<ReusableModalComponent>
  ) {}

  ngOnInit(): void {
    this.configForm();
    this.configActionButtons();
    this.filterAutocomplete();
    this.linkDependantSelects();
    this.getDataForAutocomplete();
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

  public getDataForAutocomplete(): void {
    this._formSrv.getPersonsToAutocomplete().subscribe(
      (response) => {
        if (response && response.data) {
          this.options = response.data.persons;
          console.log(this.options);
        }
      },
      (error) => {
        console.log('mocking a server ERROR::', error);
        return error;
      }
    );
  }

  public filterAutocomplete() {
    this.getDataForAutocomplete();
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
    severityRange.valueChanges.subscribe((sev) => {
      if (severityRange.value === 1) {
        this.isMinorSeverity = true;
        this.severityTypeOptions = this.severityTypeMinor;
      }
      if (severityRange.value === 2) {
        this.isMayorSeverity = true;
        this.severityTypeOptions = this.severityTypeMayor;
      }
      if (severityRange.value === 3) {
        this.severityTypeOptions = this.severityTypeCritical;
        this.incidentForm.get('notification').setValidators(Validators.required);
      }
    });
  }

  public configActionButtons() {
    this.btnDeleteIncident = this.configButton(
      'Eliminar incidencia',
      'red-btn'
    );
    this.btnRegisterIncident = this.configButton(
      'Registrar incidencia',
      'blue-btn'
    );
  }

  public configButton(text: string, style: string): IButtonModel {
    return {
      text: text,
      style: style,
    };
  }

  public sendForm() {
    this.incidentForm.value();
    this.dialogRef.close();
  }

  cancelForm() {
    this.dialogRef.close();
  }
}
