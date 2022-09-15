import { Pipe, PipeTransform } from '@angular/core';

interface UserLike {
	firstName: string;
	lastName: string;
	middleName?: string;
}

@Pipe({
	name: 'fullName',
})
export class FullNamePipe implements PipeTransform {
	transform(user: UserLike, middleName = false, startWithLastName = false): string {
		const names = [
			startWithLastName && user.lastName,
			user.firstName,
			middleName ? user.middleName : null,
			!startWithLastName && user.lastName,
		];
		return names.filter(Boolean).join(' ');
	}
}
