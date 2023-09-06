import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCalanderAppComponent } from './patient-calander-app.component';

describe('PatientCalanderAppComponent', () => {
  let component: PatientCalanderAppComponent;
  let fixture: ComponentFixture<PatientCalanderAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientCalanderAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientCalanderAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
