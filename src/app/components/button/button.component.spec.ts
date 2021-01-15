import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { IButtonModel } from './button.model';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    // instancia
    component = fixture.componentInstance;
    component.config =  new IButtonModel();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should recive @Input of model button', () => {
    expect(component.config instanceof IButtonModel).toBeTruthy();
  });
});
