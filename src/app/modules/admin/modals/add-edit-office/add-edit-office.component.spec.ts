import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditOfficeComponent } from './add-edit-office.component';

describe('NewOfficeComponent', () => {
	let component: AddEditOfficeComponent;
	let fixture: ComponentFixture<AddEditOfficeComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AddEditOfficeComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AddEditOfficeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
