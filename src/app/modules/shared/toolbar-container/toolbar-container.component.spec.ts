import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarContainerComponent } from './toolbar-container.component';

describe('ToolbarContainerComponent', () => {
  let component: ToolbarContainerComponent;
  let fixture: ComponentFixture<ToolbarContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
