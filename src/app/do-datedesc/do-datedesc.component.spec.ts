import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoDatedescComponent } from './do-datedesc.component';

describe('DatedescComponent', () => {
  let component: DoDatedescComponent;
  let fixture: ComponentFixture<DoDatedescComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoDatedescComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoDatedescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
