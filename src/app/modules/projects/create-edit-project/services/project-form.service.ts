import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { combineLatest, Observable, of } from 'rxjs';
import { ProjectInfo } from '@api/project-service/models/project-info';
import { DateTime } from 'luxon';
import { map } from 'rxjs/operators';
import { DirtyFormChecker } from '@app/utils/dirty-form-checker';
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

	constructor(private fb: FormBuilder) {}

	public getInvalidState$(): Observable<boolean> {
		return combineLatest([
			this.form.statusChanges.pipe(map((status: string) => status === 'INVALID')),
			this.initialValue
				? new DirtyFormChecker(this.form, this.initialValue, ProjectComparator.compare).isDirty$
				: of(false),
		]).pipe(map((invalid: boolean[]) => invalid.some(Boolean)));
	}

	public setInitialValue(project: ProjectInfo): void {
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

	// public getEditRequest(): EditRequest<ProjectPath> {
	//
	// }
}

class ProjectComparator {
	public static compare(val1: FormValue, val2: FormValue): boolean {
		const [v1, v2] = [val1, val2].map(ProjectComparator.flatten);
		return Object.keys(v1).every((k: string) => {
			const prop1 = v1[k];
			const prop2 = v2[k];
			if ((prop1 == null || prop1 === '') && (prop2 == null || prop2 === '')) {
				return true;
			}
			if (prop1 instanceof DateTime && prop2 instanceof DateTime) {
				return +prop1.startOf('day') === +prop2.startOf('day');
			}
			return prop1 === prop2;
		});
	}

	private static flatten(val: FormValue): { [key: string]: any } {
		return {
			...val.info,
			...val.details,
			...val.description,
		};
	}
}
