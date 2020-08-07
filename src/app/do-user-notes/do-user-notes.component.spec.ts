import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoUserNotesComponent } from './do-user-notes.component';

describe('DoUserNotesComponent', () => {
  let component: DoUserNotesComponent;
  let fixture: ComponentFixture<DoUserNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoUserNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoUserNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
