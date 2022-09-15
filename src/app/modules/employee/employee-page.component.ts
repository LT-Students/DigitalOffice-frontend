import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '@app/services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { User } from '@app/models/user/user.model';
import { UserRights } from '@app/types/user-rights.enum';
import { UserArchiveRecoveryService } from '@app/services/user-archive-recovery.service';
import { EmployeePageService } from './services/employee-page.service';
import { ManageCommunicationsService } from './components/communications/services/manage-communications.service';

@Component({
	selector: 'do-employee-page',
	templateUrl: './employee-page.component.html',
	styleUrls: ['./employee-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [EmployeePageService, ManageCommunicationsService],
})
export class EmployeePageComponent implements OnInit, OnDestroy {
	public readonly UserRights = UserRights;
	public selectedUser$ = this.employeeService.selectedUser$;
	private destroy$ = new Subject<void>();

	constructor(
		private archiveRecovery: UserArchiveRecoveryService,
		private userService: UserService,
		private employeeService: EmployeePageService,
		private route: ActivatedRoute
	) {}

	public ngOnInit(): void {
		this.route.data
			.pipe(
				map((data) => data['employee'] as User),
				switchMap((user: User) => this.employeeService.setUser(user)),
				takeUntil(this.destroy$)
			)
			.subscribe();
	}

	public archiveUser(userId: string): void {
		this.archiveRecovery.archiveUser(userId).subscribe();
	}

	public restoreUser(user: User): void {
		this.archiveRecovery.restoreUser(user.id, user.communications, !!user.pendingCommunicationId).subscribe();
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
