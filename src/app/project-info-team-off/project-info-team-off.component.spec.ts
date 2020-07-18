import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInfoTeamOffComponent } from './project-info-team-off.component';

describe('ProjectInfoTeamOffComponent', () => {
  let component: ProjectInfoTeamOffComponent;
  let fixture: ComponentFixture<ProjectInfoTeamOffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectInfoTeamOffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInfoTeamOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
