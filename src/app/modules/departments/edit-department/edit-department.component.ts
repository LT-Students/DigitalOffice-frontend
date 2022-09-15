import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DoValidators } from '@app/validators/do-validators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationService } from '@app/services/navigation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '@app/services/dialog.service';
import { finalize, first, switchMap, switchMapTo } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { DepartmentPath, PatchDocument } from '@app/types/edit-request';
import { booleanGuard } from '@app/utils/utils';
import { LoadingState } from '@app/utils/loading-state';
import { DepartmentPageStateService } from '../department-id-route-container/department-page-state.service';
import { Department } from '../department-page/department';
import { DepartmentService } from '../services/department.service';

interface FormValue {
	name: string;
	shortName: string;
	description: string;
}

@Component({
	selector: 'do-edit-department',
	templateUrl: './edit-department.component.html',
	styleUrls: ['./edit-department.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditDepartmentComponent extends LoadingState implements OnInit {
	public form!: FormGroup;

	public department$ = this.departmentPageState.department$;
	get departmentFirstValue$(): Observable<Department> {
		return this.department$.pipe(first());
	}

	constructor(
		private fb: FormBuilder,
		private navigation: NavigationService,
		private route: ActivatedRoute,
		private router: Router,
		private departmentPageState: DepartmentPageStateService,
		private departmentService: DepartmentService,
		private dialog: DialogService
	) {
		super();
	}

	public ngOnInit(): void {
		this.departmentFirstValue$.subscribe({
			next: (d: Department) => {
				this.form = this.fb.group({
					name: [d.name, [DoValidators.required, DoValidators.matchMaxLength(300)]],
					shortName: [d.shortName, [DoValidators.required, DoValidators.matchMaxLength(40)]],
					description: [d.description, [DoValidators.matchMaxLength(1000)]],
				});
			},
		});
	}

	public onCancel(): void {
		this.navigation.back('..', this.route);
	}

	public onSubmit(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}
		this.setLoading(true);
		this.departmentFirstValue$
			.pipe(
				switchMap((d: Department) => {
					const editRequest = this.getEditRequest(this.form.value, d);
					if (editRequest.length) {
						return this.departmentService
							.editDepartment(d.id, editRequest)
							.pipe(switchMapTo(this.refreshDepartment()));
					}
					return of(true);
				}),
				finalize(() => this.setLoading(false))
			)
			.subscribe({
				next: () => this.router.navigate(['..'], { relativeTo: this.route }),
			});
	}

	public changeStatus(): void {
		this.departmentFirstValue$
			.pipe(
				switchMap((d: Department) => {
					const action$ = this.departmentService
						.changeDepartmentStatus(d.id, !d.isActive)
						.pipe(switchMap(() => this.refreshDepartment()));
					const confirmConfig = d.isActive
						? {
								title: 'Удаление департамента',
								message: `Вы действительно хотите удалить департамент <span class="text-accent_controls_default">${d.name}</span>?`,
								confirmText: 'Да, удалить',
								action$,
						  }
						: {
								title: 'Восстановление департамента',
								message: `Вы действительно хотите восстановить департамент <span class="text-accent_controls_default">${d.name}</span>?`,
								confirmText: 'Восстановить',
								action$,
						  };
					return this.dialog.confirm(confirmConfig).afterClosed();
				})
			)
			.subscribe();
	}

	private getEditRequest(formValue: FormValue, initialValue: FormValue): PatchDocument<DepartmentPath>[] {
		return ['name', 'shortName', 'description']
			.map((k: string) => {
				const key = k as keyof FormValue;
				const newValue = formValue[key];
				if (newValue !== initialValue[key]) {
					return new PatchDocument(newValue, `/${key}` as DepartmentPath);
				}
				return null;
			})
			.filter(booleanGuard);
	}

	private refreshDepartment(): Observable<Department> {
		return this.departmentPageState.refreshDepartment();
	}
}
