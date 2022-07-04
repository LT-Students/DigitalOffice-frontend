import {
	EditRequest,
	FormDataEditRequest,
	InitialDataEditRequest,
	PatchDocument,
	PatchPath,
} from '@app/types/edit-request';
import { DateTime } from 'luxon';

export function setProperty<T>(property: T): NonNullable<T> | null {
	return property ? (property as NonNullable<T>) : null;
}

export const EMPTY_GUID = '00000000-0000-0000-0000-000000000000';

export function isGUIDEmpty(id: string): boolean {
	return id === EMPTY_GUID;
}

export function createEditRequest<T extends PatchPath>(
	form: FormDataEditRequest<T>,
	initialData: InitialDataEditRequest<T>
): EditRequest<T> {
	return (Object.keys(form) as T[]).reduce((acc: EditRequest<T>, key) => {
		const formValue: any = form[key];
		if (formValue !== initialData[key]) {
			const patchDocument: PatchDocument<T> = {
				op: 'replace',
				path: key,
				value:
					formValue instanceof DateTime ? formValue.plus({ minutes: formValue.offset }).toISO() : formValue,
			};
			acc.push(patchDocument);
		}
		return acc;
	}, []);
}
