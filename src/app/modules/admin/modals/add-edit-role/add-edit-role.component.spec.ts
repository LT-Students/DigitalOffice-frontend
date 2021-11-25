import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRoleComponent } from './add-edit-role.component';

describe('NewRoleComponent', () => {
	let component: AddEditRoleComponent;
	let fixture: ComponentFixture<AddEditRoleComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AddEditRoleComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AddEditRoleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
