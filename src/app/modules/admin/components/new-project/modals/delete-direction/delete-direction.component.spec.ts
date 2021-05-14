import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDirectionComponent } from './delete-direction.component';

describe('DeleteDirectionComponent', () => {
  let component: DeleteDirectionComponent;
  let fixture: ComponentFixture<DeleteDirectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDirectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
