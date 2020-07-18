import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStatsComponent } from './project-stats.component';

describe('ProjectStatsComponent', () => {
  let component: ProjectStatsComponent;
  let fixture: ComponentFixture<ProjectStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
