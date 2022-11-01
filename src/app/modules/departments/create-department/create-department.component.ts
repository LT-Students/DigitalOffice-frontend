import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NavigationService } from '@app/services/navigation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder } from '@angular/forms';
import { DoValidators } from '@app/validators/do-validators';
import { finalize } from 'rxjs/operators';
import { AppRoutes } from '@app/models/app-routes';
import { LoadingState } from '@app/utils/loading-state';
import { DepartmentService } from '../services/department.service';

@Component({
	selector: 'do-create-department',
	templateUrl: './create-department.component.html',
	styleUrls: ['./create-department.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateDepartmentComponent extends LoadingState implements OnInit {
	public form = this.fb.group({
		name: ['', [DoValidators.required, DoValidators.matchMaxLength(300)]],
		shortName: ['', [DoValidators.required, DoValidators.matchMaxLength(40)]],
		description: ['', [DoValidators.matchMaxLength(1000)]],
	});

	constructor(
		private fb: UntypedFormBuilder,
		private navigation: NavigationService,
		private route: ActivatedRoute,
		private router: Router,
		private departmentService: DepartmentService
	) {
		super();
	}

	public ngOnInit(): void {}

	public onCancel(): void {
		this.navigation.back('..', this.route);
	}

	public onSubmit(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}
		this.setLoading(true);
		const { name, shortName, description } = this.form.value;
		this.departmentService
			.createDepartment(name, shortName, description)
			.pipe(finalize(() => this.setLoading(false)))
			.subscribe({
				next: (id: string) => this.router.navigateByUrl(`/${AppRoutes.Departments}/${id}`),
			});
	}
}
