import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortProjectOffComponent } from './sort-project-off.component';

describe('SortProjectOffComponent', () => {
  let component: SortProjectOffComponent;
  let fixture: ComponentFixture<SortProjectOffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortProjectOffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortProjectOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
