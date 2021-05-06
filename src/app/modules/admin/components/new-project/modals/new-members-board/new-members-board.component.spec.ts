import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMembersBoardComponent } from './new-members-board.component';

describe('AddMemberComponent', () => {
  let component: NewMembersBoardComponent;
  let fixture: ComponentFixture<NewMembersBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewMembersBoardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMembersBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
