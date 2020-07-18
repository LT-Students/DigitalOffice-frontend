import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendPostComponent } from './send-post.component';

describe('SendPostComponent', () => {
  let component: SendPostComponent;
  let fixture: ComponentFixture<SendPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
