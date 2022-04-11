import { Pipe, PipeTransform } from '@angular/core';
import { User } from '@app/models/user/user.model';

@Pipe({
	name: 'fullName',
})
export class FullNamePipe implements PipeTransform {
	transform(user: User, middleName: boolean = true): string {
		return `${user.firstName} ${middleName && user?.middleName ? user.middleName + ' ' : ' '}${user.lastName}`;
	}
}
