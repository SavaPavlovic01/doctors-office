import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAllDoctorsComponent } from './patient-all-doctors.component';

describe('PatientAllDoctorsComponent', () => {
  let component: PatientAllDoctorsComponent;
  let fixture: ComponentFixture<PatientAllDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientAllDoctorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientAllDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
