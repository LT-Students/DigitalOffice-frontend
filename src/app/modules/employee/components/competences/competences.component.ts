import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { EducationModel, StudyType } from '@app/models/education.model';
import { MatAutocomplete, } from '@angular/material/autocomplete';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { CertificateInfo } from '@data/api/user-service/models/certificate-info';
import { User } from '@app/models/user.model';
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
  selector: 'do-employee-page-competences',
  templateUrl: 'competences.component.html',
  styleUrls: ['competences.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT },
  ],
})

export class CompetencesComponent implements OnInit {
  @Input() public skills: string[];
  @Input() public institutes: EducationModel[];
  @Input() public courses: EducationModel[];
  @Input() public studyTypes: StudyType[];
  @Input() public user: User;

  public workFlowMode: typeof WorkFlowMode = WorkFlowMode;
  public selectedEducationItem: EducationModel;
  public sectionModes: Modes;
  public editForm: FormGroup;
  public certificates: EducationModel[];
  public insts: EducationModel[];

  @ViewChild('skillsInput') skillsInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('pickerStartYear') pickerStartYear: MatDatepicker<Date>;
  @ViewChild('pickerEndYear') pickerEndYear: MatDatepicker<Date>;

  constructor() {
    this.sectionModes = {
      skills: WorkFlowMode.VIEW,
      education: WorkFlowMode.VIEW,
      certificates: WorkFlowMode.VIEW,
    };
    this.selectedEducationItem = null;
    this.certificates = null;
    this.insts = null;

    this.editForm = new FormGroup({
      educationInstitution: new FormControl(''),
      specialization: new FormControl(''),
      studyType: new FormControl(''),
      endYear: new FormControl(''),
      startYear: new FormControl(''),
      certificateId: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.certificates = this.user.certificates.map((certificate: CertificateInfo) => new EducationModel(certificate))

    this.insts = this.certificates;

    console.log(this.certificates);
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
      educationInstitution: item.educationInstitution ? item.educationInstitution : null,
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
}
