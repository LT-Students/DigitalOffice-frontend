import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { User } from '@app/models/user/user.model';
import { Observable } from 'rxjs';

@Component({
	selector: 'do-edit-info',
	templateUrl: './edit-info.component.html',
	styleUrls: ['./edit-info.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditInfoComponent {
	constructor(@Inject(DIALOG_DATA) data: Observable<User>) {}
}
