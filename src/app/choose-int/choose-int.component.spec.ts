import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseIntComponent } from './choose-int.component';

describe('ChooseIntComponent', () => {
  let component: ChooseIntComponent;
  let fixture: ComponentFixture<ChooseIntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseIntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseIntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
