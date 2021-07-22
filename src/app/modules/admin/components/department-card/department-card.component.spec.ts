import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentCardComponent } from './department-card.component';

describe('DepartmentCardComponent', () => {
  let component: DepartmentCardComponent;
  let fixture: ComponentFixture<DepartmentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
