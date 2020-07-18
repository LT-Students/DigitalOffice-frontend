import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInfoTeamComponent } from './project-info-team.component';

describe('ProjectInfoTeamComponent', () => {
  let component: ProjectInfoTeamComponent;
  let fixture: ComponentFixture<ProjectInfoTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectInfoTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInfoTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
