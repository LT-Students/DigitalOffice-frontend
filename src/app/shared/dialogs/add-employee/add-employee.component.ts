import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { debounceTime, map, takeUntil, tap } from 'rxjs/operators';
import { FilterService, FilterUsersRequest } from '@app/services/filter/filter.service';
import { UserInfo } from '@api/filter-service/models/user-info';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';

export enum OpenAddEmployeeModalFrom {
	Default = '',
	Project = 'Проект',
	Department = 'Департамент',
}

@Component({
	selector: 'do-modal-add-employee',
	templateUrl: './add-employee.component.html',
	styleUrls: ['./add-employee.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEmployeeComponent implements OnInit, OnDestroy {
	public positions: string[];
	public employees: UserInfo[];
	public displayedColumns: string[];
	public dataSource: MatTableDataSource<UserInfo>;
	public selection: SelectionModel<UserInfo>;
	public usersFound: boolean;
	public moduleName: string;
	public openFromRu: OpenAddEmployeeModalFrom;
	public employeeCountMap: { [k: string]: string };
	public countToHide: number;
	public isAllReceived: boolean;
	public filter = this.fb.group({
		name: [''],
	});

	private takeUsers = 10;
	private skipUsers = 0;
	private destroy$ = new Subject<void>();

	constructor(
		private filterService: FilterService,
		private cdr: ChangeDetectorRef,
		private dialogRef: MatDialogRef<AddEmployeeComponent>,
		private fb: FormBuilder,
		@Inject(MAT_DIALOG_DATA)
		private _data: { idToHide: string[]; pageId: string; openFrom: OpenAddEmployeeModalFrom; moduleName: string }
	) {
		this.isAllReceived = false;
		this.countToHide = 0;
		this.positions = ['NOT IMPLEMENTED YET']; //[ 'front', 'back', 'manager', 'lead' ];
		this.employees = [];
		this.displayedColumns = ['select', 'name', 'department'];
		this.selection = new SelectionModel<UserInfo>(true, []);
		this.dataSource = new MatTableDataSource();
		this.usersFound = false;
		this.moduleName = this._data.moduleName;
		this.openFromRu = OpenAddEmployeeModalFrom.Default;

		this.employeeCountMap = {
			one: 'Добавить # сотрудника',
			few: 'Добавить # сотрудника',
			other: 'Добавить # сотрудников',
		};
	}

	public ngOnInit(): void {
		this.getPageUsers();
		this.openFromRu = this._data.openFrom;

		this.filter.valueChanges.pipe(debounceTime(500), takeUntil(this.destroy$)).subscribe({
			next: (form) => {
				this.skipUsers = 0;
				this.getPageUsers({ fullnameincludesubstring: form.name });
			},
		});
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public onClose(result?: UserInfo[]): void {
		this.dialogRef.close(result);
	}

	public getPageUsers(filter?: Partial<FilterUsersRequest>): void {
		// if (this.isAllReceived) return;
		if (filter && this.skipUsers === 0) {
			this.employees = [];
		}

		this.filterService
			.filterUsers({
				...filter,
				skipCount: this.skipUsers,
				takeCount: this.takeUsers + (this.countToHide || this._data.idToHide.length),
			})
			.pipe(
				tap((result) => {
					if (result.body) {
						this.usersFound = true;
						this.skipUsers += result.body?.length ?? 0;
					}
					if (this.skipUsers >= (result.totalCount ?? 0)) {
						this.isAllReceived = true;
					}
				}),
				map((result) => result.body ?? ([] as UserInfo[]))
			)
			.subscribe((users: UserInfo[]) => {
				const viewed = users.filter((e) => this._data.idToHide.indexOf(e.id as string) === -1);
				this.countToHide = users.length - viewed.length;
				this.employees.push(...viewed);
				this.dataSource = new MatTableDataSource(this.employees);

				this.cdr.markForCheck();
			});
	}
}
