import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradientGraphicsComponent } from '../../gradient-graphics/gradient-graphics.component';

describe('GradientGraphicsComponent', () => {
  let component: GradientGraphicsComponent;
  let fixture: ComponentFixture<GradientGraphicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradientGraphicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradientGraphicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
