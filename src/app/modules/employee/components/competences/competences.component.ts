//@ts-nocheck
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Certificate, UniversityInfo } from '@app/models/education.model';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { CertificateInfo } from '@data/api/user-service/models/certificate-info';
import { User } from '@app/models/user/user.model';
import { EducationType } from '@data/api/user-service/models/education-type';
import { setProperty } from '@app/utils/utils';
import { ModalService, ModalWidth } from '@app/services/modal.service';
import { MatDialogRef } from '@angular/material/dialog/dialog-ref';
import { ImageInfo } from '@data/api/user-service/models/image-info';
import { UploadPhotoComponent } from '../../modals/upload-photo/upload-photo.component';
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
	@Input() public studyTypes: EducationType[];
	@Input() public user: User;

	public workFlowMode: typeof WorkFlowMode = WorkFlowMode;
	public selectedCertificate: Certificate;
	public selectedUniversity: UniversityInfo;
	public selectedEducationItem: Certificate | UniversityInfo;
	public sectionModes: Modes;
	public editForm: FormGroup;
	public certificates: Certificate[];
	public institutes: Certificate[];

	@ViewChild('pickerStartYear') pickerStartYear: MatDatepicker<Date>;
	@ViewChild('pickerEndYear') pickerEndYear: MatDatepicker<Date>;

	constructor(private _modalService: ModalService) {
		this.sectionModes = {
			skills: WorkFlowMode.VIEW,
			education: WorkFlowMode.VIEW,
			certificates: WorkFlowMode.VIEW,
		};
		this.selectedCertificate = null;
		this.selectedUniversity = null;
		this.certificates = null;
		this.institutes = null;

		this.editForm = new FormGroup({
			schoolName: new FormControl(''),
			name: new FormControl(''),
			educationType: new FormControl(''),
			receivedAt: new FormControl(''),
			startYear: new FormControl(''),
			certificateImage: new FormControl(''),
		});
	}

	ngOnInit(): void {
		this.certificates = this.user.certificates
			? this.user.certificates.map((certificate: CertificateInfo) => new Certificate(certificate))
			: null;

		this.institutes = this.certificates.slice();

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
		this.sectionModes.certificates = WorkFlowMode.VIEW;
		let educationPlaceToAdd: UniversityInfo | Certificate;
		// const  educationPlaceToAdd: EducationModel = new EducationModel(this.editForm.value);
		this.editForm.reset();
		// TODO: refactor
		// Edit mode
		// if (this.selectedEducationItem) {
		// 	let itemIndex: number = this.certificates.indexOf(this.selectedEducationItem);
		// 	this.certificates[itemIndex] = educationPlaceToAdd;
		// } else {
		// 	this.certificates.unshift(educationPlaceToAdd);
		// 	this.sectionModes.certificates = WorkFlowMode.VIEW;
		// }
	}

	public onReset(): void {
		if (this.selectedEducationItem) {
			// TODO: refactor
			// this.selectedEducationItem.isEditing = false;
			this.selectedEducationItem = null;
		}
		this.editForm.reset();
		this.sectionModes.education = WorkFlowMode.VIEW;
		this.sectionModes.certificates = WorkFlowMode.VIEW;
	}

	public onEducationAddClicked(): void {
		this.selectedUniversity = null;
		this.sectionModes.education = WorkFlowMode.ADD;
	}

	public onCertificateAddClicked(): void {
		this.selectedCertificate = null;
		this.sectionModes.certificates = WorkFlowMode.ADD;
	}

	public onCertificateImageAddClicked(): void {
		const modalRef: MatDialogRef<UploadPhotoComponent> = this._modalService.openModal(UploadPhotoComponent, ModalWidth.M);

		modalRef.afterClosed().subscribe((data: ImageInfo) => {
			this.editForm.patchValue({ certificateImage: data.content });
		});
	}

	public onSkillsEditClicked(): void {
		this.sectionModes.skills = this.sectionModes.skills === WorkFlowMode.VIEW ? WorkFlowMode.EDIT : WorkFlowMode.VIEW;
	}

	public onRowEditClicked(item: Certificate | UniversityInfo): void {
		this.sectionModes.certificates = WorkFlowMode.EDIT;
		this.selectedEducationItem = item;
		// TODO: refactor
		// item.isEditing = true;
		this.editForm.setValue({
			schoolName: setProperty(item.institutionName),
			name: setProperty(item.specializationName),
			educationType: setProperty(item.studyType),
			receivedAt: setProperty(item.receivedAt),
			id: setProperty(item.id),
		});
		if (item instanceof UniversityInfo) {
			this.editForm.patchValue({ startYear: item.admissionAt })
		}
	}

	public onRowDeleteClicked(item: Certificate | UniversityInfo): void {
		if (item instanceof Certificate) {
			const itemIndex: number = this.certificates.indexOf(item);
			this.certificates.splice(itemIndex, 1);
		}
	}
}
