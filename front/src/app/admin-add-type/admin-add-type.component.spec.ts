import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddTypeComponent } from './admin-add-type.component';

describe('AdminAddTypeComponent', () => {
  let component: AdminAddTypeComponent;
  let fixture: ComponentFixture<AdminAddTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
