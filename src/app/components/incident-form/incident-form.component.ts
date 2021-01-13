import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ReusableModalComponent } from '../reusable-modal/reusable-modal.component';

@Component({
  selector: 'app-incident-form',
  templateUrl: './incident-form.component.html',
  styleUrls: ['./incident-form.component.less'],
})
export class IncidentFormComponent implements OnInit {
  public incidentForm: FormGroup;
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
  }

  public configForm() {
    this.incidentForm = this.fb.group({
      datePickerTask: new FormControl(null),
      severitySelect: new FormControl(null),
      severityTypeSelect: new FormControl(null),
      notification: new FormControl(null),
      datePickerOpening: new FormControl(null),
    });
  }

  cancelForm() {
    this.dialogRef.close();
  }

  //   configSelect() {
  //     return {
  //       severityRange: [
  //         { value: '1', viewValue: 'Menor' },
  //         { value: '2', viewValue: 'Mayor' },
  //         { value: '3', viewValue: 'Grave' },
  //       ],
  //     };
  //   }
}
