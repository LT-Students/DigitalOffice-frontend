import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortTagOffComponent } from './sort-tag-off.component';

describe('SortTagOffComponent', () => {
  let component: SortTagOffComponent;
  let fixture: ComponentFixture<SortTagOffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortTagOffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortTagOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
