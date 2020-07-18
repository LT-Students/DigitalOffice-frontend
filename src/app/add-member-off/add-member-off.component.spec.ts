import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberOffComponent } from './add-member-off.component';

describe('AddMemberOffComponent', () => {
  let component: AddMemberOffComponent;
  let fixture: ComponentFixture<AddMemberOffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMemberOffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemberOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
