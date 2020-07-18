import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortCardsComponent } from './sort-cards.component';

describe('SortCardsComponent', () => {
  let component: SortCardsComponent;
  let fixture: ComponentFixture<SortCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
