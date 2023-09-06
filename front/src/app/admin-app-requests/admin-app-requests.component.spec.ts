import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAppRequestsComponent } from './admin-app-requests.component';

describe('AdminAppRequestsComponent', () => {
  let component: AdminAppRequestsComponent;
  let fixture: ComponentFixture<AdminAppRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAppRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAppRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
