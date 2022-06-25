import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { FormValue } from './services/project-form.service';

export interface CreateEditProject {
	pageConfig: { title: string; submitButtonLabel: string };
	isEditMode: boolean;
	submit$(value: FormValue): Observable<string>;
}

export const CreateEditProject = new InjectionToken<CreateEditProject>('CreateEditProject');
