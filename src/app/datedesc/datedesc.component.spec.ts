import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatedescComponent } from './datedesc.component';

describe('DatedescComponent', () => {
  let component: DatedescComponent;
  let fixture: ComponentFixture<DatedescComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatedescComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatedescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
