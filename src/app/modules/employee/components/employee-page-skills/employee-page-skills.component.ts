import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
import { WorkFlowMode } from '../../employee-page.component';


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
  selector: 'do-employee-page-skills',
  templateUrl: 'employee-page-skills.component.html',
  styleUrls: ['employee-page-skills.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT },
  ],
})

export class EmployeePageSkillsComponent implements OnInit {
  @Input() public skills: string[];
  @Input() public institutes: EducationModel[];
  @Input() public courses: EducationModel[];
  @Input() public studyTypes: StudyType[];

  public visible: boolean;
  public selectable: boolean;
  public removable: boolean;
  public addOnBlur: boolean;
  public workFlowMode: typeof WorkFlowMode = WorkFlowMode;
  public filteredSkills: Observable<string[]>;
  public skillsCtrl: FormControl;
  public selectedEducationItem: EducationModel;
  readonly separatorKeysCodes: number[];
  public sectionModes: Modes;
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
    this.sectionModes = {
      skills: WorkFlowMode.VIEW,
      education: WorkFlowMode.VIEW,
      certificates: WorkFlowMode.VIEW,
    };
    this.skillsCtrl = new FormControl();
    this.selectedEducationItem = null;

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

  ngOnInit(): void {
    console.log(this.studyTypes);
  }

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
    this.skillsCtrl.reset();
  }

  public onStartYearSelected(selectedDate: any): void {
    const dateToSet: Date = new Date(selectedDate.year(), 0, 1);
    this.editForm.patchValue({ startYear: dateToSet });
    this.pickerStartYear.close();
  }

  public onEndYearSelected(selectedDate: any): void {
    const dateToSet: Date = new Date(selectedDate.year(), 0, 1);
    this.editForm.patchValue({ endYear: dateToSet });
    this.pickerEndYear.close();
  }

  public onSubmit(): void {
    if (!this.editForm.valid) {
      return;
    }
    const educationPlaceToAdd: EducationModel = new EducationModel(this.editForm.value);
    this.editForm.reset();

    // Edit mode
    if (this.selectedEducationItem) {
      let itemIndex: number = this.courses.indexOf(this.selectedEducationItem);

      if (itemIndex === -1) {
        itemIndex = this.institutes.indexOf(this.selectedEducationItem);
        this.institutes[itemIndex] = educationPlaceToAdd;
      } else {
        this.courses[itemIndex] = educationPlaceToAdd;
      }
    } else {
      // Add mode
      /* check which type is adding */
      if (this.sectionModes.education === WorkFlowMode.ADD) {
        this.institutes.unshift(educationPlaceToAdd);
        this.sectionModes.education = WorkFlowMode.VIEW;
      } else if (this.sectionModes.certificates === WorkFlowMode.ADD) {
        this.courses.unshift(educationPlaceToAdd);
        this.sectionModes.certificates = WorkFlowMode.VIEW;
      }
    }
  }

  public onReset(): void {
    if (this.selectedEducationItem) {
      this.selectedEducationItem.isEditing = false;
      this.selectedEducationItem = null;
    }
    this.editForm.reset();
    this.sectionModes.education = WorkFlowMode.VIEW;
    this.sectionModes.certificates = WorkFlowMode.VIEW;
  }

  public onEducationAddClicked(): void {
    this.selectedEducationItem = null;
    this.sectionModes.education = WorkFlowMode.ADD;
  }

  public onCertificateAddClicked(): void {
    this.selectedEducationItem = null;
    this.sectionModes.certificates = WorkFlowMode.ADD;
  }

  public onRowEditClicked(
      item: EducationModel,
      course: boolean = false
  ): void {
    if (course) {
      this.sectionModes.certificates = WorkFlowMode.EDIT;
    } else {
      this.sectionModes.education = WorkFlowMode.EDIT;
    }
    this.selectedEducationItem = item;
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

  public onRowDeleteClicked(
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
