import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsBlockComponent } from './tags-block.component';

describe('TagsBlockComponent', () => {
	let component: TagsBlockComponent;
	let fixture: ComponentFixture<TagsBlockComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TagsBlockComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TagsBlockComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
