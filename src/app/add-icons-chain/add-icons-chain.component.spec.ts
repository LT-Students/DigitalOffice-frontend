import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIconsChainComponent } from './add-icons-chain.component';

describe('AddIconsChainComponent', () => {
  let component: AddIconsChainComponent;
  let fixture: ComponentFixture<AddIconsChainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIconsChainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIconsChainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
