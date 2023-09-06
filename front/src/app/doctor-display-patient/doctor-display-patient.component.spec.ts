import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorDisplayPatientComponent } from './doctor-display-patient.component';

describe('DoctorDisplayPatientComponent', () => {
  let component: DoctorDisplayPatientComponent;
  let fixture: ComponentFixture<DoctorDisplayPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorDisplayPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorDisplayPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
