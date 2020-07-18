import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondIconsCamComponent } from './respond-icons-cam.component';

describe('RespondIconsCamComponent', () => {
  let component: RespondIconsCamComponent;
  let fixture: ComponentFixture<RespondIconsCamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespondIconsCamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespondIconsCamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
