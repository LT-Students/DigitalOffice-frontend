import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberOnComponent } from './add-member-on.component';

describe('AddMemberOnComponent', () => {
  let component: AddMemberOnComponent;
  let fixture: ComponentFixture<AddMemberOnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMemberOnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemberOnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
