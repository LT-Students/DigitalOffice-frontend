import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHoursChoiceComponent } from './add-hours-choice.component';

describe('AddHoursChoiceComponent', () => {
  let component: AddHoursChoiceComponent;
  let fixture: ComponentFixture<AddHoursChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddHoursChoiceComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHoursChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
