import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingACompanyComponent } from './adding-a-company.component';

describe('AddingACompanyComponent', () => {
  let component: AddingACompanyComponent;
  let fixture: ComponentFixture<AddingACompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddingACompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingACompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
