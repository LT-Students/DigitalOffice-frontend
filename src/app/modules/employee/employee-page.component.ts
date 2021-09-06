import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UserService } from '@app/services/user/user.service';
import { EducationType } from '@data/api/user-service/models';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { ProjectService } from '@app/services/project/project.service';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { EmployeePageService } from '@app/services/employee-page.service';
import { ArchiveComponent } from './modals/archive/archive.component';
import { AdminRequestComponent } from './modals/admin-request/admin-request.component';

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
	styleUrls: [ './employee-page.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeePageComponent implements OnInit, OnDestroy {
	public studyTypes: EducationType[];
	// public paths: Path[];
	// public isOwner: boolean;

	// private dialogRef;
	private _unsubscribe$: Subject<void>;

	constructor(
		private _dialog: MatDialog,
		private _userService: UserService,
		private _projectService: ProjectService,
		private _employeeService: EmployeePageService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _snackBar: MatSnackBar,
		private _cdr: ChangeDetectorRef,
	) {
		this.studyTypes = [ EducationType.Offline, EducationType.Online ];
		this._unsubscribe$ = new Subject<void>();
	}

	public ngOnInit(): void {
		// this.isOwner = user.id === this.pageId;
		this._route.params
		.pipe(
			takeUntil(this._unsubscribe$),
			switchMap((params) => this._employeeService.getEmployee(params.id)),
		)
		.subscribe();
	}

	public ngOnDestroy(): void {
		this._unsubscribe$.next();
		this._unsubscribe$.complete();
	}

	// onOpenDialog(): void {
	// 	const dialogComponent = this.user.isAdmin ? ArchiveComponent : AdminRequestComponent;
	//
	// 	this.dialogRef = this._dialog.open(dialogComponent, {});
	// 	this.dialogRef.afterClosed().subscribe((result: string) => {
	// 		this.showMessage(result);
	// 	});
	// }
	//
	// showMessage(message: string): void {
	// 	if (message) {
	// 		this._snackBar.open(message, 'accept', { duration: 3000 });
	// 	}
	// }
}
