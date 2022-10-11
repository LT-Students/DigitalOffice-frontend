import { Component, ChangeDetectionStrategy, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Observable, of, Subject, timer } from 'rxjs';
import { UntypedFormControl } from '@angular/forms';
import { debounce, finalize, map, startWith, takeUntil, tap } from 'rxjs/operators';
import { Icons } from '@shared/modules/icons/icons';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { SelectionModel } from '@app/utils/selection-model';
import { ProjectUserRoleType } from '@api/project-service/models/project-user-role-type';
import { UserInfo } from '@api/project-service/models/user-info';
import { ProjectResponse } from '@api/project-service/models/project-response';
import { LoadingState } from '@app/utils/loading-state';
import { TableComponent } from '../../table/table.component';
import { TableOptions } from '../../table/models/table-options';
import { AddProjectUsersService, ProjectUserInfo } from './add-project-users.service';

export interface HiddenUser<T> {
	id: string;
	role: T;
}

export interface AddEmployeeDialogData {
	usersToHide: HiddenUser<ProjectUserRoleType>[];
	entityId: string;
	entityName: string;
}

// TODO replace with same component from standalone module
@Component({
	selector: 'do-add-project-users',
	templateUrl: './add-project-users.component.html',
	styleUrls: ['./add-project-users.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [AddProjectUsersService],
})
export class AddProjectUsersComponent extends LoadingState implements OnInit, OnDestroy {
	public readonly Icons = Icons;

	@ViewChild(TableComponent, { static: true }) table!: TableComponent<any>;
	public dataSource!: AddUsersDataSource;
	public tableData!: TableOptions;

	public searchControl = new UntypedFormControl(null);
	public toggleControl = new UntypedFormControl(false);
	private destroy$ = new Subject<void>();

	constructor(
		private addUsersService: AddProjectUsersService,
		private dialogRef: MatDialogRef<AddProjectUsersComponent>,
		@Inject(MAT_DIALOG_DATA) public data: AddEmployeeDialogData
	) {
		super();
	}

	public ngOnInit(): void {
		this.dataSource = new AddUsersDataSource(this.addUsersService, this.table.selection, this.data.usersToHide);
		this.tableData = this.addUsersService.getTableData(this.data.usersToHide, this.dataSource);
		this.searchControl.valueChanges
			.pipe(
				startWith(''),
				tap(
					(v: string) =>
						v && this.toggleControl.value && this.toggleControl.setValue(false, { emitEvent: false })
				),
				debounce((search: string) => timer(search ? 300 : 0)),
				takeUntil(this.destroy$)
			)
			.subscribe({ next: (search: string) => this.dataSource.loadUsers(search) });
		this.toggleControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({
			next: (isOn: boolean) => {
				if (isOn) {
					this.searchControl.setValue('');
				}
			},
		});
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public addUsers(): void {
		this.setLoading(true);
		const users = this.table.selection.selected;
		if (!users.length) {
			this.close();
			return;
		}
		this.addUsersService
			.addUsers(this.data.entityId, users)
			.pipe(finalize(() => this.setLoading(false)))
			.subscribe({ next: (users?: [UserInfo[], ProjectResponse]) => this.close(users) });
	}

	public close(result?: [UserInfo[], ProjectResponse]): void {
		this.dialogRef.close(result);
	}
}

export class AddUsersDataSource implements DataSource<ProjectUserInfo> {
	private data = new BehaviorSubject<ProjectUserInfo[]>([]);

	constructor(
		private addUsersService: AddProjectUsersService,
		private selection: SelectionModel<ProjectUserInfo>,
		private usersToHide: HiddenUser<ProjectUserRoleType>[]
	) {}

	connect(collectionViewer: CollectionViewer): Observable<ProjectUserInfo[]> {
		return this.data.asObservable();
	}

	disconnect(collectionViewer: CollectionViewer): void {}

	public loadUsers(search: string): void {
		let users$: Observable<ProjectUserInfo[]>;
		if (search) {
			users$ = this.addUsersService.findUsers(search).pipe(
				map((users: ProjectUserInfo[]) => {
					return users.map((u: ProjectUserInfo) => {
						const hu = this.usersToHide.find((hu: HiddenUser<ProjectUserRoleType>) => hu.id === u.id);
						return hu && hu.role !== u.projectRole ? { ...u, projectRole: hu.role } : u;
					});
				}),
				map(this.mapUsersToSelected.bind(this))
			);
		} else {
			users$ = of(this.selection.selected);
		}
		users$.subscribe({ next: (users) => this.data.next(users) });
	}

	public updateRow(id: string, newValue: ProjectUserInfo): void {
		const users = this.data.value.map((u: ProjectUserInfo) => (u.id === id ? newValue : u));
		const index = this.selection.selected.findIndex((u: ProjectUserInfo) => u.id === id);
		if (index != null) {
			this.selection.selected[index] = newValue;
		}
		this.data.next(users);
	}

	private mapUsersToSelected(users: ProjectUserInfo[]): ProjectUserInfo[] {
		return users.map((u: ProjectUserInfo) => {
			const user = this.selection.selected.find((selected: ProjectUserInfo) => u.id === selected.id);
			return { ...(user || u) };
		});
	}
}
