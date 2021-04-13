import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePageProjectsComponent } from './employee-page-projects.component';

describe('EmployeePageProjectsComponent', () => {
  let component: EmployeePageProjectsComponent;
  let fixture: ComponentFixture<EmployeePageProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeePageProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePageProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
