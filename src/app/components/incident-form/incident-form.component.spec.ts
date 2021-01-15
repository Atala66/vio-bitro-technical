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
  const mockDialogRef = {
    close: jasmine.createSpy('close'),
    open: jasmine.createSpy('open'),
  };
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
        { provide: MatDialogRef, useValue: { mockDialogRef } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentFormComponent);
    component = fixture.componentInstance;
    debugCssElement = fixture.debugElement.query(By.css('form'));
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

  xit('should close modal when cancel btn', () => {
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/36661
    const spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.cancelForm();
    expect(spy).toHaveBeenCalled();
  });

  xit('should close modal when register btn', () => {
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/36661
    const spy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.sendFormAndCloseModal();
    expect(spy).toHaveBeenCalled();
  });

  it('should verify dropdowns changes values', async () => {
    const severitySelect = fixture.debugElement.query(
      By.css('.mat-select-trigger')
    );
    severitySelect.nativeElement.value = 'foo';
    severitySelect.nativeElement.dispatchEvent(new Event('change'));
    fixture.whenStable().then(() => {
      expect(severitySelect.nativeElement.value).toBe('foo');
    });
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
