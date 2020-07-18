import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortTagComponent } from './sort-tag.component';

describe('SortTagComponent', () => {
  let component: SortTagComponent;
  let fixture: ComponentFixture<SortTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
