import { Component, ChangeDetectionStrategy, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { FormControl } from '@angular/forms';
import { debounce, finalize, startWith, takeUntil, tap } from 'rxjs/operators';
import { Icons } from '@shared/modules/icons/icons';
import { LoadingState } from '@app/utils/loading-state';
import { TableComponent } from '../table/table.component';
import { TableOptions } from '../table/models';
import { DynamicFilterComponent, FilterEvent } from '../dynamic-filter/dynamic-filter.component';
import { AddUsersApiBase, AddUsersTableConfigService, FilterConfigService } from './services';
import { AddUsersDialogData, AddUsersDataSource, NewUserBase } from './models';

@Component({
	selector: 'do-add-users-dialog',
	templateUrl: './add-users-dialog.component.html',
	styleUrls: ['./add-users-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUsersDialogComponent extends LoadingState implements OnInit, OnDestroy {
	public readonly Icons = Icons;

	@ViewChild(DynamicFilterComponent, { static: true }) filter!: DynamicFilterComponent;
	@ViewChild(TableComponent, { static: true }) table!: TableComponent<NewUserBase>;
	public dataSource!: AddUsersDataSource;
	public tableData!: TableOptions;
	public filterConfig = this.filterConfigService.getFilterConfig();

	public toggleControl = new FormControl(false, { nonNullable: true });
	private destroy$ = new Subject<void>();

	constructor(
		@Inject(DIALOG_DATA) public data: AddUsersDialogData,
		private apiService: AddUsersApiBase,
		private tableConfigService: AddUsersTableConfigService<NewUserBase>,
		private filterConfigService: FilterConfigService,
		private dialogRef: DialogRef<AddUsersDialogComponent>
	) {
		super();
	}

	public ngOnInit(): void {
		this.dataSource = new AddUsersDataSource(this.apiService, this.table.selection);
		this.tableConfigService.dataSource = this.dataSource;

		this.tableData = this.tableConfigService.getTableConfig(this.data.existingUsers);

		this.filter.filterChange
			.pipe(
				startWith({}),
				tap((f: FilterEvent) => {
					console.log(f);
					if (!this.isFilterEmpty(f) && this.toggleControl.value) {
						this.toggleControl.setValue(false, { emitEvent: false });
					}
				}),
				debounce((f: FilterEvent) => timer(!this.isFilterEmpty(f) ? 300 : 0)),
				takeUntil(this.destroy$)
			)
			.subscribe({ next: (search: FilterEvent) => this.dataSource.loadUsers(search) });
		this.toggleControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({
			next: (isOn: boolean) => {
				if (isOn) {
					this.filter.form.reset();
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

	private isFilterEmpty(filter: FilterEvent): boolean {
		return !Object.values(filter).some(Boolean);
	}
}
