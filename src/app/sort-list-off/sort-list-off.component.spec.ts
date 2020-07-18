import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortListOffComponent } from './sort-list-off.component';

describe('SortListOffComponent', () => {
  let component: SortListOffComponent;
  let fixture: ComponentFixture<SortListOffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortListOffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortListOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
