import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondIconsAirplaneComponent } from './respond-icons-airplane.component';

describe('RespondIconsAirplaneComponent', () => {
  let component: RespondIconsAirplaneComponent;
  let fixture: ComponentFixture<RespondIconsAirplaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespondIconsAirplaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespondIconsAirplaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
