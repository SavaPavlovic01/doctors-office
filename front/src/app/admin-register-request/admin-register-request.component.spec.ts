import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegisterRequestComponent } from './admin-register-request.component';

describe('AdminRegisterRequestComponent', () => {
  let component: AdminRegisterRequestComponent;
  let fixture: ComponentFixture<AdminRegisterRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRegisterRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRegisterRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
