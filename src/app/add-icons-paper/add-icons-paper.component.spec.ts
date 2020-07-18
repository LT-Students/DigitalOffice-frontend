import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIconsPaperComponent } from './add-icons-paper.component';

describe('AddIconsPaperComponent', () => {
  let component: AddIconsPaperComponent;
  let fixture: ComponentFixture<AddIconsPaperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIconsPaperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIconsPaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
