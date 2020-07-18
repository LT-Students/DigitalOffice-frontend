import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInfoMyStatComponent } from './project-info-my-stat.component';

describe('ProjectInfoMyStatComponent', () => {
  let component: ProjectInfoMyStatComponent;
  let fixture: ComponentFixture<ProjectInfoMyStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectInfoMyStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInfoMyStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
