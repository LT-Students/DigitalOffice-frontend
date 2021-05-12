import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
	selector: 'do-skills',
	templateUrl: './skills.component.html',
	styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
	@Input() public skills: string[];

	public visible: boolean;
	public selectable: boolean;
	public removable: boolean;
	public addOnBlur: boolean;
	public filteredSkills: Observable<string[]>;
	public skillsCtrl: FormControl;
	readonly separatorKeysCodes: number[];

	@ViewChild('skillsInput') skillsInput: ElementRef<HTMLInputElement>;
	@ViewChild('auto') matAutocomplete: MatAutocomplete;

	constructor() {
		this.visible = true;
		this.selectable = true;
		this.removable = true;
		this.addOnBlur = true;
		this.separatorKeysCodes = [ENTER, COMMA];
		this.skillsCtrl = new FormControl();



		this.filteredSkills = this.skillsCtrl.valueChanges.pipe(
			startWith(null),
			map((skill: string | null) =>
				skill ? this._filter(skill) : this.skills.slice()
			)
		);
	}

	ngOnInit(): void {
	}

	public add(event: MatChipInputEvent): void {
		const input = event.input;
		const value = event.value;

		if ((value || '').trim()) {
			this.skills.push(value.trim());
		}

		if (input) {
			input.value = '';
		}
	}

	public remove(skill: string): void {
		const index = this.skills.indexOf(skill);

		if (index >= 0) {
			this.skills.splice(index, 1);
		}
	}

	public selected(event: MatAutocompleteSelectedEvent): void {
		this.skills.push(event.option.viewValue);
		this.skillsCtrl.reset();
	}

	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();

		return this.skills.filter(
			(skill) => skill.toLowerCase().indexOf(filterValue) === 0
		);
	}
}
