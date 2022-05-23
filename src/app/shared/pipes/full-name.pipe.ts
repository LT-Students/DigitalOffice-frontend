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
	transform(user: UserLike, middleName: boolean = false): string {
		return [ user.firstName.trim(), middleName ? user.middleName?.trim() : null, user.lastName.trim() ].filter(Boolean).join(' ');
	}
}
