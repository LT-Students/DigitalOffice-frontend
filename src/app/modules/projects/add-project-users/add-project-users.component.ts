import { Component, ChangeDetectionStrategy, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Observable, of, Subject, timer } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounce, finalize, map, startWith, takeUntil } from 'rxjs/operators';
import { Icons } from '@shared/modules/icons/icons';
import { LoadingState } from '@shared/directives/button-loading.directive';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { SelectionModel } from '@app/utils/selection-model';
import { TableComponent } from '../../table/table.component';
import { TableOptions } from '../../table/models/table-options';
import { AddProjectUsersService, ProjectUserInfo } from './add-project-users.service';

export interface AddEmployeeDialogData {
	idsToHide: string[];
	entityId: string;
	entityName: string;
}

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

	public searchControl = new FormControl(null);
	public toggleControl = new FormControl(false);
	private destroy$ = new Subject<void>();

	constructor(
		private addUsersService: AddProjectUsersService,
		private dialogRef: MatDialogRef<AddProjectUsersComponent>,
		@Inject(MAT_DIALOG_DATA) public data: AddEmployeeDialogData
	) {
		super();
	}

	public ngOnInit(): void {
		this.dataSource = new AddUsersDataSource(this.addUsersService, this.table.selection);
		this.tableData = this.addUsersService.getTableData(this.data.idsToHide, this.dataSource);
		this.searchControl.valueChanges
			.pipe(
				startWith(''),
				debounce((search: string) => timer(search ? 300 : 0))
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
			.subscribe({ next: (users?: ProjectUserInfo[]) => this.close(users) });
	}

	public close(users?: ProjectUserInfo[]): void {
		this.dialogRef.close(users);
	}
}

export class AddUsersDataSource implements DataSource<ProjectUserInfo> {
	private data = new BehaviorSubject<ProjectUserInfo[]>([]);

	constructor(private addUsersService: AddProjectUsersService, private selection: SelectionModel<ProjectUserInfo>) {}

	connect(collectionViewer: CollectionViewer): Observable<ProjectUserInfo[]> {
		return this.data.asObservable();
	}

	disconnect(collectionViewer: CollectionViewer): void {}

	public loadUsers(search: string): void {
		let users$: Observable<ProjectUserInfo[]>;
		if (search) {
			users$ = this.addUsersService.findUsers(search).pipe(map(this.mapUsersToSelected.bind(this)));
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
