import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EducationModel, StudyType } from '@app/models/education.model';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

// eslint-disable-next-line no-shadow
export enum WorkFlowMode {
  EDIT = 'EDIT',
  VIEW = 'VIEW',
}

@Component({
  selector: 'do-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.scss'],
})
export class EmployeePageComponent implements OnInit {
  public visible: boolean;
  public selectable: boolean;
  public removable: boolean;
  public addOnBlur: boolean;
  public workFlowMode: typeof WorkFlowMode = WorkFlowMode;
  public mode: WorkFlowMode;
  public skills: string[];
  public filteredSkills: Observable<string[]>;
  public skillsCtrl: FormControl;
  public institutes: EducationModel[];
  public courses: EducationModel[];
  public selectedEducationItem: EducationModel;
  readonly separatorKeysCodes: number[];

  @ViewChild('skillsInput') skillsInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor() {
    this.visible = true;
    this.selectable = true;
    this.removable = true;
    this.addOnBlur = true;
    this.separatorKeysCodes = [ENTER, COMMA];
    this.mode = WorkFlowMode.EDIT;
    this.skillsCtrl = new FormControl();
    this.skills = [
      'Atlassian Jira',
      'Key Account Management',
      'CJM',
      'Agile Project Management',
      'Agile Project Management',
      'Agile Project Management',
      'Agile Project Management',
      'Agile Project Management',
      'Agile Project Management',
    ];
    this.institutes = [
      new EducationModel({
        educationInstitution: 'Университет ИТМО',
        specialization: 'Информационная безопасность',
        studyType: StudyType.CONFRONT,
        startYear: 2014,
        endYear: 2018,
      }),
      new EducationModel({
        educationInstitution:
          'Национальный исследовательский университет «Высшая школа экономики»',
        specialization: 'Информационная безопасность',
        studyType: StudyType.ABSENTIA,
        startYear: 2018,
        endYear: 2020,
      }),
    ];
    this.courses = [
      new EducationModel({
        educationInstitution: 'Бруноям',
        specialization: 'UX/UI дизайнер',
        studyType: StudyType.OFFLINE,
        endYear: 2020,
        certificateId: 'f92f878c-8cad-11eb-8dcd-0242ac130003',
      }),
      new EducationModel({
        educationInstitution: 'HTML-academy',
        specialization: 'Веб-программирование',
        studyType: StudyType.ONLINE,
        endYear: 2020,
        certificateId: 'f92f878c-8cad-11eb-8dcd-0242ac130003',
      }),
    ];
    this.selectedEducationItem = this.institutes[0];

    this.filteredSkills = this.skillsCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) =>
        skill ? this._filter(skill) : this.skills.slice()
      )
    );
  }

  ngOnInit(): void {}

  public add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.skills.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(skill: string): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.skills.push(event.option.viewValue);
    this.skillsInput.nativeElement.value = '';
    this.skillsCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.skills.filter(
      (skill) => skill.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
