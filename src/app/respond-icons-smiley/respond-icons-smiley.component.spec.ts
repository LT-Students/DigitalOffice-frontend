import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondIconsSmileyComponent } from './respond-icons-smiley.component';

describe('RespondIconsSmileyComponent', () => {
  let component: RespondIconsSmileyComponent;
  let fixture: ComponentFixture<RespondIconsSmileyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespondIconsSmileyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespondIconsSmileyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
