import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorsTimelistComponent } from './directors-timelist.component';

describe('DirectorTimelistComponent', () => {
	let component: DirectorsTimelistComponent;
	let fixture: ComponentFixture<DirectorsTimelistComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DirectorsTimelistComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(DirectorsTimelistComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
