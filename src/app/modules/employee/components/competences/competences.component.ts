import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { EducationModel, StudyType } from '@app/models/education.model';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { CertificateInfo } from '@data/api/user-service/models/certificate-info';
import { User } from '@app/models/user/user.model';
import { WorkFlowMode } from '../../employee-page.component';
import { EducationType } from '@data/api/user-service/models/education-type';
import { ImageInfo } from '@data/api/user-service/models/image-info';

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
	@Input() public studyTypes: EducationType[];
	@Input() public user: User;

	public workFlowMode: typeof WorkFlowMode = WorkFlowMode;
	public selectedEducationItem: EducationModel;
	public sectionModes: Modes;
	public editForm: FormGroup;
	public certificates: EducationModel[];
	public institutes: EducationModel[];

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
		this.institutes = null;

		this.editForm = new FormGroup({
			schoolName: new FormControl(''),
			name: new FormControl(''),
			educationType: new FormControl(''),
			receivedAt: new FormControl(''),
			startYear: new FormControl(''),
			id: new FormControl(''),
		});
	}

	ngOnInit(): void {
		this.certificates = this.user.certificates
			? this.user.certificates.map((certificate: CertificateInfo) => new EducationModel(certificate))
			: null;

		this.institutes = this.certificates;

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
			let itemIndex: number = this.certificates.indexOf(this.selectedEducationItem);
			this.certificates[itemIndex] = educationPlaceToAdd;
		} else {
			this.certificates.unshift(educationPlaceToAdd);
			this.sectionModes.certificates = WorkFlowMode.VIEW;
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

	public onSkillsEditClicked(): void {
		this.sectionModes.skills = this.sectionModes.skills === WorkFlowMode.VIEW ? WorkFlowMode.EDIT : WorkFlowMode.VIEW;
	}

	public onRowEditClicked(item: EducationModel): void {
		this.sectionModes.certificates = WorkFlowMode.EDIT;
		this.selectedEducationItem = item;
		item.isEditing = true;
		this.editForm.setValue({
			schoolName: item.educationInstitution ? item.educationInstitution : null,
			name: item.specialization ? item.specialization : null,
			educationType: item.studyType ? item.studyType : null,
			receivedAt: item.endYear ? item.endYear : null,
			startYear: item.startYear ? item.startYear : null,
			id: item.certificateId ? item.certificateId : null,
		});
	}

	public onRowDeleteClicked(item: EducationModel): void {
		const itemIndex: number = this.certificates.indexOf(item);
		this.certificates.splice(itemIndex, 1);
	}
}
