import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayperiodComponent } from './dayperiod.component';

describe('DayperiodComponent', () => {
  let component: DayperiodComponent;
  let fixture: ComponentFixture<DayperiodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayperiodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayperiodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
