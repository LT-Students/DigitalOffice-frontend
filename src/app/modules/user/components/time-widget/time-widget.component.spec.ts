import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeWidgetComponent } from './time-widget.component';

describe('ChartComponent', () => {
	let component: TimeWidgetComponent;
	let fixture: ComponentFixture<TimeWidgetComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TimeWidgetComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TimeWidgetComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
