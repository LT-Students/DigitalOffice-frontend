import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveDraftComponent } from './save-draft.component';

describe('SaveDraftComponent', () => {
  let component: SaveDraftComponent;
  let fixture: ComponentFixture<SaveDraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveDraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
