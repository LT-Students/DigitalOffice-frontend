import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInfoFeedOffComponent } from './project-info-feed-off.component';

describe('ProjectInfoFeedOffComponent', () => {
  let component: ProjectInfoFeedOffComponent;
  let fixture: ComponentFixture<ProjectInfoFeedOffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectInfoFeedOffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInfoFeedOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
