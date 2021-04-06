import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainInfoComponent } from './main-info.component';

describe('EmployeeInfoComponent', () => {
  let component: MainInfoComponent;
  let fixture: ComponentFixture<MainInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainInfoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
