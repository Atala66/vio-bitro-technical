import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { IncidentFormComponent } from './incident-form.component';
import { IncidentFormService } from './incident-form.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ButtonModule } from '../button/button.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('IncidentFormComponent', () => {
  let component: IncidentFormComponent;
  let fixture: ComponentFixture<IncidentFormComponent>;
  let debugCssElement: DebugElement;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncidentFormComponent],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        ButtonModule,
      ],
      providers: [
        IncidentFormService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentFormComponent);
    component = fixture.componentInstance;
    // get by css
    debugCssElement = fixture.debugElement.query(By.css('form'));
    // returns domReference
    nativeElement = debugCssElement.nativeElement;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid if empty values', () => {
    component.incidentForm.controls['datePickerTask'].setValue('');
    component.incidentForm.controls['severitySelect'].setValue('');
    component.incidentForm.controls['severityTypeSelect'].setValue('');
    component.incidentForm.controls['datePickerOpening'].setValue('');
    expect(component.incidentForm.valid).toBeFalsy();
  });
  it('form should be valid if filled values', () => {
    component.incidentForm.controls['datePickerTask'].setValue('01-01-2021');
    component.incidentForm.controls['severitySelect'].setValue('1');
    component.incidentForm.controls['severityTypeSelect'].setValue('8');
    component.incidentForm.controls['datePickerOpening'].setValue('01-01-2021');
    expect(component.incidentForm.valid).toBeTruthy();
  });
});
