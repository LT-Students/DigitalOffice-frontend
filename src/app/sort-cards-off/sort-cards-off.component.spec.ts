import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortCardsOffComponent } from './sort-cards-off.component';

describe('SortCardsOffComponent', () => {
  let component: SortCardsOffComponent;
  let fixture: ComponentFixture<SortCardsOffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortCardsOffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortCardsOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
