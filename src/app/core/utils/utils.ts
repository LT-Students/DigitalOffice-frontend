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

export const MAX_INT32 = 2 ** 31 - 1;

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

export function b64toBlob(b64Data: string, contentType = '', sliceSize = 512): Blob {
	const byteCharacters = atob(b64Data);
	const byteArrays = [];

	for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		const slice = byteCharacters.slice(offset, offset + sliceSize);

		const byteNumbers = new Array(slice.length);
		for (let i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}

		const byteArray = new Uint8Array(byteNumbers);
		byteArrays.push(byteArray);
	}

	const blob = new Blob(byteArrays, { type: contentType });
	return blob;
}
