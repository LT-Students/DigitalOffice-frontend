import { Component, ChangeDetectionStrategy, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, timer } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounce, finalize, startWith, takeUntil, tap } from 'rxjs/operators';
import { Icons } from '@shared/modules/icons/icons';
import { LoadingState } from '@shared/directives/button-loading.directive';
import { TableComponent } from '../table/table.component';
import { TableOptions } from '../table/models/table-options';
import { AddUsersTableConfigService } from './services/add-users-table-config.service';
import { AddUsersDialogData, NewUserBase } from './models/models';
import { AddUsersDataSource } from './models/add-users-data-source';
import { AddUsersApiBase } from './services/add-users-api.service';

@Component({
	selector: 'do-add-users-dialog',
	templateUrl: './add-users-dialog.component.html',
	styleUrls: ['./add-users-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUsersDialogComponent extends LoadingState implements OnInit, OnDestroy {
	public readonly Icons = Icons;

	@ViewChild(TableComponent, { static: true }) table!: TableComponent<NewUserBase>;
	public dataSource!: AddUsersDataSource;
	public tableData!: TableOptions;

	public searchControl = new FormControl(null);
	public toggleControl = new FormControl(false);
	private destroy$ = new Subject<void>();

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: AddUsersDialogData,
		private apiService: AddUsersApiBase,
		private tableConfigService: AddUsersTableConfigService<NewUserBase>,
		private dialogRef: MatDialogRef<AddUsersDialogComponent>
	) {
		super();
	}

	public ngOnInit(): void {
		this.dataSource = new AddUsersDataSource(this.apiService, this.table.selection);
		this.tableConfigService.dataSource = this.dataSource;

		this.tableData = this.tableConfigService.getTableConfig(this.data.existingUsers);

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
		this.apiService
			.addUsers(this.data.entityId, users)
			.pipe(finalize(() => this.setLoading(false)))
			.subscribe({ next: (result?: any) => this.close(result) });
	}

	public close(result?: any): void {
		this.dialogRef.close(result);
	}
}
