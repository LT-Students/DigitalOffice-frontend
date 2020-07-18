import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInfoFeedComponent } from './project-info-feed.component';

describe('ProjectInfoFeedComponent', () => {
  let component: ProjectInfoFeedComponent;
  let fixture: ComponentFixture<ProjectInfoFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectInfoFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInfoFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
