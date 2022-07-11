import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '@app/models/user/user.model';
import { Observable } from 'rxjs';

@Component({
	selector: 'do-edit-info',
	templateUrl: './edit-info.component.html',
	styleUrls: ['./edit-info.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditInfoComponent implements OnInit {
	constructor(@Inject(MAT_DIALOG_DATA) data: Observable<User>) {}

	ngOnInit(): void {}
}
