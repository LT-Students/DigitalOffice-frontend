//@ts-nocheck
import { EducationModel } from '@app/models/education.model';
import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from '@app/services/user/user.service';
import { EducationType, OperationResultResponseUserResponse, UserInfo } from '@data/api/user-service/models';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { ProjectService } from '@app/services/project/project.service';
import { User } from '@app/models/user/user.model';
import { ArchiveComponent } from './modals/archive/archive.component';
import { AdminRequestComponent } from './modals/admin-request/admin-request.component';
import { activeProject, closedProject } from './mock';

// eslint-disable-next-line no-shadow
export enum WorkFlowMode {
	EDIT = 'EDIT',
	VIEW = 'VIEW',
	ADD = 'ADD',
}

export interface Modes {
	skills: WorkFlowMode;
	education: WorkFlowMode;
	certificates: WorkFlowMode;
}

export interface Path {
	title: string;
	url?: string;
}

@Component({
	selector: 'do-employee-page',
	templateUrl: './employee-page.component.html',
	styleUrls: ['./employee-page.component.scss'],
changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeePageComponent implements OnInit, OnDestroy {
	public institutes: EducationModel[];
	public courses: EducationModel[];
	public studyTypes: EducationType[];
	public paths: Path[];
	public pageId: string;
	public isOwner: boolean;
	public user: User;

	private dialogRef;
	private _unsubscribe$: Subject<void>;

	constructor(
		public dialog: MatDialog,
		private _userService: UserService,
		private _projectService: ProjectService,
		private route: ActivatedRoute,
		private router: Router,
		private snackBar: MatSnackBar
	) {
		const user: User = this._userService.currentUser$;
		this.pageId = this.route.snapshot.paramMap.get('id');
		if (!this.pageId) {
			this.router.navigate([`employee/${user.id}`]);
		}
		this.studyTypes = [EducationType.Offline, EducationType.Online];
		this.user = null;
		this._unsubscribe$ = new Subject<void>();
	}

	ngOnInit(): void {
		this.isOwner = user.id === this.pageId;
	}

	ngOnDestroy() {
		this._unsubscribe$.next();
		this._unsubscribe$.complete();
	}

	onOpenDialog(): void {
		const dialogComponent = this.user.isAdmin ? ArchiveComponent : AdminRequestComponent;

		this.dialogRef = this.dialog.open(dialogComponent, {});
		this.dialogRef.afterClosed().subscribe((result: string) => {
			this.showMessage(result);
		});
	}

	showMessage(message: string): void {
		if (message) {
			this.snackBar.open(message, 'accept', { duration: 3000 });
		}
	}
}
