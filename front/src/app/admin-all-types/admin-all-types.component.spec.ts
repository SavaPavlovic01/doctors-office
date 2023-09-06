import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllTypesComponent } from './admin-all-types.component';

describe('AdminAllTypesComponent', () => {
  let component: AdminAllTypesComponent;
  let fixture: ComponentFixture<AdminAllTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAllTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAllTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
