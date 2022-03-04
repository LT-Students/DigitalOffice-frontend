import { Pipe, PipeTransform } from '@angular/core';
import { User } from '@app/models/user/user.model';

@Pipe({
	name: 'fullName',
})
export class FullNamePipe implements PipeTransform {
	transform(user: User): string {
		return `${user.firstName} ${user.lastName}`;
	}
}
