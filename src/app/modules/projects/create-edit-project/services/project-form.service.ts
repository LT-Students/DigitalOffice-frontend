import { Injectable } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { DateTime } from 'luxon';
import { EditRequest, PatchDocument, ProjectPath } from '@app/types/edit-request';
import { getUTCWithOffset } from '@app/utils/utils';
import { ProjectResponse } from '@api/project-service/models/project-response';
import { InfoControlValue } from '../project-info/project-info-form.component';
import { DetailsControlValue } from '../project-details/project-details.component';
import { DescriptionControlValue } from '../project-description/project-description-form.component';

export interface FormValue {
	info: InfoControlValue;
	details: DetailsControlValue;
	description: DescriptionControlValue;
}

@Injectable()
export class ProjectFormService {
	public form = this.fb.group({
		info: [null],
		details: [null],
		description: [null],
	});

	private initialValue?: FormValue;

	constructor(private fb: UntypedFormBuilder) {}

	public getSubmitValue(): EditRequest<ProjectPath> | FormValue {
		const formValue = this.form.getRawValue();
		return this.initialValue ? ProjectEditRequest.getEditRequest(formValue, this.initialValue) : formValue;
	}

	public setInitialValue(project: ProjectResponse): void {
		this.initialValue = {
			info: {
				name: project.name,
				shortName: project.shortName,
				customer: project.customer,
				department: project.department,
			},
			details: {
				status: project.status,
				startDate: DateTime.fromISO(project.startDateUtc),
				endDate: project.endDateUtc ? DateTime.fromISO(project.endDateUtc) : undefined,
			},
			description: {
				description: project.description,
				shortDescription: project.shortDescription,
			},
		};
		this.form.setValue(this.initialValue, { emitEvent: false });
	}
}

class ProjectEditRequest {
	private static pathMap: { [key: string]: ProjectPath } = {
		name: ProjectPath.NAME,
		shortName: ProjectPath.SHORT_NAME,
		customer: ProjectPath.CUSTOMER,
		status: ProjectPath.STATUS,
		startDate: ProjectPath.START_DATE,
		endDate: ProjectPath.END_DATE,
		description: ProjectPath.DESCRIPTION,
		shortDescription: ProjectPath.SHORT_DESCRIPTION,
	};

	public static getEditRequest(newValue: FormValue, origValue: FormValue): EditRequest<ProjectPath> {
		const [v1, v2] = [newValue, origValue].map(ProjectEditRequest.flatten);
		const req: EditRequest<ProjectPath> = [];
		Object.keys(v1).forEach((k: string) => {
			const prop1 = v1[k];
			const prop2 = v2[k];
			if (!ProjectEditRequest.compare(prop1, prop2)) {
				const patchDocument: PatchDocument<ProjectPath> = {
					path: this.pathMap[k],
					op: 'replace',
					value: ProjectEditRequest.setNewValue(prop1),
				};
				req.push(patchDocument);
			}
		});

		return req;
	}

	private static setNewValue(v: any): string | number {
		return v instanceof DateTime ? getUTCWithOffset(v) : v;
	}

	private static compare(v1: any, v2: any): boolean {
		if ((v1 == null || v1 === '') && (v2 == null || v2 === '')) {
			return true;
		}
		if (v1 instanceof DateTime && v2 instanceof DateTime) {
			return +v1.startOf('day') === +v2.startOf('day');
		}
		return v1 === v2;
	}

	private static flatten(val: FormValue): { [key: string]: any } {
		return {
			...val.info,
			...val.details,
			...val.description,
		};
	}
}
