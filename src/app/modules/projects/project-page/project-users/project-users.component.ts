import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ProjectUsersService } from './project-users.service';

@Component({
	selector: 'do-project-users',
	templateUrl: './project-users.component.html',
	styleUrls: ['./project-users.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ProjectUsersService],
})
export class ProjectUsersComponent implements OnInit {
	public readonly Icons = Icons;

	public filterData = this.usersService.getFilterData();
	public tableColumns = this.usersService.getTableColumns();

	public dataSource = this.route.data.pipe(map((data) => data.users));

	constructor(private usersService: ProjectUsersService, private route: ActivatedRoute) {}

	ngOnInit(): void {}

	public addUsers(): void {}
}
