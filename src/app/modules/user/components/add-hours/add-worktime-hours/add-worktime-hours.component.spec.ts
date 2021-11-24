import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorktimeHoursComponent } from './add-worktime-hours.component';

describe('AddWorktimeHoursComponent', () => {
	let component: AddWorktimeHoursComponent;
	let fixture: ComponentFixture<AddWorktimeHoursComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AddWorktimeHoursComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AddWorktimeHoursComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
