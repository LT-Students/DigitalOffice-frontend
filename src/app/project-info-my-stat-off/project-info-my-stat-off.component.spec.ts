import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInfoMyStatOffComponent } from './project-info-my-stat-off.component';

describe('ProjectInfoMyStatOffComponent', () => {
  let component: ProjectInfoMyStatOffComponent;
  let fixture: ComponentFixture<ProjectInfoMyStatOffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectInfoMyStatOffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInfoMyStatOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
