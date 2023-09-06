import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDoctorProfileComponent } from './admin-doctor-profile.component';

describe('AdminDoctorProfileComponent', () => {
  let component: AdminDoctorProfileComponent;
  let fixture: ComponentFixture<AdminDoctorProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDoctorProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDoctorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
