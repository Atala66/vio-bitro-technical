import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IncidentFormComponent } from './incident-form.component';
import { IncidentFormService } from './incident-form.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ButtonModule } from '../button/button.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('IncidentFormComponent', () => {
  let component: IncidentFormComponent;
  let fixture: ComponentFixture<IncidentFormComponent>;
  let debugCssElement: DebugElement;
  let nativeElement: HTMLElement;
  let httpTestingController: HttpTestingController;
  let service: IncidentFormService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncidentFormComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        MaterialModule,
        ButtonModule,
        EditorModule,
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
    // inject by css
    debugCssElement = fixture.debugElement.query(By.css('form'));
    // returns domReference
    nativeElement = debugCssElement.nativeElement;
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(IncidentFormService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be valid if filled values', () => {
    component.configForm();
    component.incidentForm.controls['datePickerTask'].setValue(new Date());
    component.incidentForm.controls['severitySelect'].setValue(1);
    component.incidentForm.controls['severityTypeSelect'].setValue(2);
    component.incidentForm.controls['datePickerOpening'].setValue(new Date());
    expect(component.incidentForm.valid).toBeTruthy();
  });

  it('should fail if validators fail', () => {
    component.configForm();
    const datePickerTask = component.incidentForm.controls['datePickerTask'];
    expect(datePickerTask.valid).toBeFalsy();
    datePickerTask.setValue('');
    expect(datePickerTask.hasError('required')).toBeTruthy();
    const severitySelect = component.incidentForm.controls['severitySelect'];
    expect(severitySelect.valid).toBeFalsy();
    severitySelect.setValue('');
    expect(severitySelect.hasError('required')).toBeTruthy();
    const severityTypeSelect =
      component.incidentForm.controls['severityTypeSelect'];
    expect(severityTypeSelect.valid).toBeFalsy();
    severityTypeSelect.setValue('');
    expect(severityTypeSelect.hasError('required')).toBeTruthy();
    const datePickerOpening =
      component.incidentForm.controls['datePickerOpening'];
    expect(datePickerOpening.valid).toBeFalsy();
    datePickerOpening.setValue('');
    expect(datePickerOpening.hasError('required')).toBeTruthy();
  });

  it('should return data to autocomplete component', () => {
    const mockData = {
      data: { persons: ['Mark Renton', 'Scarlett O´Hara', 'John Doe'] },
    };

    service.getPersonsToAutocomplete().subscribe((response) => {
      expect(response).toEqual(mockData);
    });
    const req = httpTestingController.expectOne(
      '../../../assets/mocks/persons.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockData);

    httpTestingController.verify();
  });
});
