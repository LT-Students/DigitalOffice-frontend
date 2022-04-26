import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkinfoComponent } from './edit-workinfo.component';

describe('EditWorkinfoComponent', () => {
	let component: EditWorkinfoComponent;
	let fixture: ComponentFixture<EditWorkinfoComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [EditWorkinfoComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(EditWorkinfoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
