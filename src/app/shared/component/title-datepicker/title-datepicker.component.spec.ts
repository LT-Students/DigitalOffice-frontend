import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleDatepickerComponent } from './title-datepicker.component';

describe('TitleDatepickerComponent', () => {
  let component: TitleDatepickerComponent;
  let fixture: ComponentFixture<TitleDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleDatepickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
