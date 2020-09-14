import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersBoardComponent } from './members-board.component';

describe('AddMemberComponent', () => {
  let component: MembersBoardComponent;
  let fixture: ComponentFixture<MembersBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
