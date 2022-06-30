import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface CreateEditProject {
	pageConfig: { title: string; submitButtonLabel: string };
	isEditMode: boolean;
	submit$(value: any): Observable<string>;
}

export const CreateEditProject = new InjectionToken<CreateEditProject>('CreateEditProject');
