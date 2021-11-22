import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeaveHoursComponent } from './add-leave-hours.component';

describe('AddLeaveHoursComponent', () => {
	let component: AddLeaveHoursComponent;
	let fixture: ComponentFixture<AddLeaveHoursComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AddLeaveHoursComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AddLeaveHoursComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
