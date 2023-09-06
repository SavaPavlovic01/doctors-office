import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFormAppComponent } from './patient-form-app.component';

describe('PatientFormAppComponent', () => {
  let component: PatientFormAppComponent;
  let fixture: ComponentFixture<PatientFormAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientFormAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientFormAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
