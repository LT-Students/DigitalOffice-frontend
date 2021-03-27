import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EducationModel, StudyType } from '@app/models/education.model';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDatepicker } from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';

// eslint-disable-next-line no-shadow
export enum WorkFlowMode {
  EDIT = 'EDIT',
  VIEW = 'VIEW',
  ADD = 'ADD',
}

export const DATE_FORMAT = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
  },
};

export interface Modes {
  skills: WorkFlowMode;
  education: WorkFlowMode;
  certificates: WorkFlowMode;
}

@Component({
  selector: 'do-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT },
  ],
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
  public sectionModes: Modes;

  public studyTypes = [
    StudyType.ABSENTIA,
    StudyType.CONFRONT,
    StudyType.PARTTIME,
    StudyType.OFFLINE,
    StudyType.ONLINE,
  ];

  public editForm: FormGroup;

  @ViewChild('skillsInput') skillsInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('pickerStartYear') pickerStartYear: MatDatepicker<Date>;
  @ViewChild('pickerEndYear') pickerEndYear: MatDatepicker<Date>;

  constructor() {
    this.visible = true;
    this.selectable = true;
    this.removable = true;
    this.addOnBlur = true;
    this.separatorKeysCodes = [ENTER, COMMA];
    this.mode = WorkFlowMode.EDIT;
    this.sectionModes = {
      skills: WorkFlowMode.VIEW,
      education: WorkFlowMode.VIEW,
      certificates: WorkFlowMode.VIEW,
    };
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
        startYear: new Date(2014, 0, 1),
        endYear: new Date(2018, 0, 1),
      }),
      new EducationModel({
        educationInstitution:
          'Национальный исследовательский университет «Высшая школа экономики»',
        specialization: 'Информационная безопасность',
        studyType: StudyType.ABSENTIA,
        startYear: new Date(2018, 0, 1),
        endYear: new Date(2020, 0, 1),
      }),
    ];
    this.courses = [
      new EducationModel({
        educationInstitution: 'Бруноям',
        specialization: 'UX/UI дизайнер',
        studyType: StudyType.OFFLINE,
        endYear: new Date(2020, 0, 1),
        certificateId: 'f92f878c-8cad-11eb-8dcd-0242ac130003',
      }),
      new EducationModel({
        educationInstitution: 'HTML-academy',
        specialization: 'Веб-программирование',
        studyType: StudyType.ONLINE,
        endYear: new Date(2020, 0, 1),
        certificateId: 'f92f878c-8cad-11eb-8dcd-0242ac130003',
      }),
    ];
    this.selectedEducationItem = new EducationModel({
      educationInstitution:
        'Национальный исследовательский университет «Высшая школа экономики»',
      specialization: 'Информационная безопасность',
      studyType: StudyType.ABSENTIA,
      startYear: new Date(2018, 0, 1),
      endYear: new Date(2020, 0, 1),
    });

    this.editForm = new FormGroup({
      educationInstitution: new FormControl(''),
      specialization: new FormControl(''),
      studyType: new FormControl(''),
      endYear: new FormControl(''),
      startYear: new FormControl(''),
      certificateId: new FormControl(''),
    });

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

  public remove(skill: string): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  public selected(event: MatAutocompleteSelectedEvent): void {
    this.skills.push(event.option.viewValue);
    this.skillsInput.nativeElement.value = '';
    this.skillsCtrl.setValue(null);
  }

  public onYearSelected(
    selectedDate: any,
    isStartYearSelected: boolean = false
  ): void {
    const dateToSet: Date = new Date(selectedDate.year(), 0, 1);
    if (isStartYearSelected) {
      this.editForm.patchValue({ startYear: dateToSet });
      this.pickerStartYear.close();
    } else {
      this.editForm.patchValue({ endYear: dateToSet });
      this.pickerEndYear.close();
    }
  }

  public onSubmit(): void {
    if (!this.editForm.valid) {
      return;
    }
    let itemIndex: number = this.courses.indexOf(this.selectedEducationItem);

    if (itemIndex === -1) {
      itemIndex = this.institutes.indexOf(this.selectedEducationItem);
      console.log(itemIndex);
      this.institutes[itemIndex] = new EducationModel(this.editForm.value);
    } else {
      this.courses[itemIndex] = new EducationModel(this.editForm.value);
    }

    console.log(this.editForm.value);
  }

  public onReset(): void {
    this.sectionModes.education = WorkFlowMode.VIEW;
    console.log(this.sectionModes);
  }

  public onItemEditClicked(
    item: EducationModel,
    course: boolean = false
  ): void {
    if (course) {
      this.sectionModes.certificates = WorkFlowMode.VIEW;
    } else {
      this.sectionModes.education = WorkFlowMode.VIEW;
    }
    this.selectedEducationItem = item;
    console.log(this.selectedEducationItem);
    item.isEditing = true;
    this.editForm.setValue({
      educationInstitution: item.educationInstitution
        ? item.educationInstitution
        : null,
      specialization: item.specialization ? item.specialization : null,
      studyType: item.studyType ? item.studyType : null,
      endYear: item.endYear ? item.endYear : null,
      startYear: item.startYear ? item.startYear : null,
      certificateId: item.certificateId ? item.certificateId : null,
    });
  }

  public onItemDeleteClicked(
    item: EducationModel,
    course: boolean = false
  ): void {
    if (course) {
      const itemIndex: number = this.courses.indexOf(item);
      this.courses.splice(itemIndex, 1);
    } else {
      const itemIndex: number = this.institutes.indexOf(item);
      this.institutes.splice(itemIndex, 1);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.skills.filter(
      (skill) => skill.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
