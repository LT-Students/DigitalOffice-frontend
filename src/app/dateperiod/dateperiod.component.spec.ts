import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateperiodComponent } from './dateperiod.component';

describe('DateperiodComponent', () => {
  let component: DateperiodComponent;
  let fixture: ComponentFixture<DateperiodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateperiodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateperiodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
