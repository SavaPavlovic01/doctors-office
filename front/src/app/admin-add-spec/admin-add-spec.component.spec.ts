import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddSpecComponent } from './admin-add-spec.component';

describe('AdminAddSpecComponent', () => {
  let component: AdminAddSpecComponent;
  let fixture: ComponentFixture<AdminAddSpecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddSpecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
