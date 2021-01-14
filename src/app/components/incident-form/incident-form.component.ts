import { Component, OnInit, ViewEncapsulation, ɵConsole } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ReusableModalComponent } from '../reusable-modal/reusable-modal.component';
import { map, startWith, take } from 'rxjs/operators';
import { IButtonModel } from '../button/button.model';
import { IncidentFormService } from './incident-form.service';
import { SuccessNotificationComponent } from '../success-notification/success-notification.component';

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
  public isCritical: boolean;
  public isNotificationClosed: boolean;
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
    private dialogRef: MatDialogRef<ReusableModalComponent>,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.configForm();
    this.configActionButtons();
    this.linkDependantSelects();
    this.filterAutocomplete();
  }

  get formControls() {
    return this.incidentForm.controls;
  }

  public configForm() {
    this.incidentForm = this.fb.group({
      datePickerTask: new FormControl(null, [Validators.required]),
      severitySelect: new FormControl(null, [Validators.required]),
      severityTypeSelect: new FormControl(null, [Validators.required]),
      notification: new FormControl(null, [this.notificationValidator()]),
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
      severityRange.clearValidators();
      if (severityRange.value === 1) {
        this.isMinorSeverity = true;
        this.severityTypeOptions = this.severityTypeMinor;
        this.isCritical = false;
      }
      if (severityRange.value === 2) {
        this.severityTypeOptions = this.severityTypeMayor;
        this.isCritical = false;
      }
      if (severityRange.value === 3) {
        this.severityTypeOptions = this.severityTypeCritical;
        this.isCritical = true;
      }
    });
  }

  public notificationValidator() {
    return (control: AbstractControl) => {
      let severityRange = null;
      if (this.incidentForm) {
        severityRange = this.incidentForm.get('severitySelect');
      }
      if (severityRange && severityRange.value === 3 && !control.value) {
        return { notification: true };
      } else {
        return null;
      }
    };
  }

  public sendForm() {
    if (this.incidentForm.valid) {
      const isValidNotification = this.validateNotification();
      if (isValidNotification) {
        this.notificateSuccess();
        this.sendFormAndCloseModal();
      }
    } else {
      this.showFormErrors();
    }
  }

  public showFormErrors() {
    Object.keys(this.incidentForm.controls).forEach((field) => {
      const control = this.incidentForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  public validateNotification() {
    let isValidForm = null;
    const severityRange = this.incidentForm.get('severitySelect');
    const notification = this.incidentForm.get('notification');
    if (severityRange && severityRange.value === 3 && !notification.value) {
      isValidForm = false;
    } else {
      isValidForm = true;
    }
    return isValidForm;
  }

  public sendFormAndCloseModal() {
      const formValues = this.incidentForm.value;
      this.dialogRef.close({ formValues: formValues });
  }

  public notificateSuccess() {
    const timeout = 2000;
    const dialogRef = this._dialog.open(SuccessNotificationComponent, {
      width: '400px',
      data: {},
    });
    dialogRef.afterOpened().subscribe((_) => {
      setTimeout(() => {
        dialogRef.close();
      }, timeout);
    });

  }

  cancelForm() {
    this.dialogRef.close();
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
}
