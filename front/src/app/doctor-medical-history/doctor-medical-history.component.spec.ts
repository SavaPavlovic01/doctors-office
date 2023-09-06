import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorMedicalHistoryComponent } from './doctor-medical-history.component';

describe('DoctorMedicalHistoryComponent', () => {
  let component: DoctorMedicalHistoryComponent;
  let fixture: ComponentFixture<DoctorMedicalHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorMedicalHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorMedicalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
