import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { ModalService, ModalWidth } from '@app/services/modal.service';
import { OfficeInfo } from '@data/api/company-service/models';
import { CompanyService } from '@app/services/company/company.service';
import { iif, Observable, ReplaySubject } from 'rxjs';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { ActivatedRoute } from '@angular/router';
import { IFindRequestEx } from '@app/types/find-request.interface';
import { map, startWith, switchMap, withLatestFrom } from 'rxjs/operators';
import { NewOfficeComponent } from '../../modals/new-office/new-office.component';

@Component({
	selector: 'do-office-list',
	templateUrl: './office-list.component.html',
	styleUrls: ['./office-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfficeListComponent {
	public offices$: Observable<OperationResultResponse<OfficeInfo[]>>;
	private _officesParams: ReplaySubject<IFindRequestEx>;

	constructor(
		private _modalService: ModalService,
		private _companyService: CompanyService,
		private _route: ActivatedRoute
	) {
		this._officesParams = new ReplaySubject<IFindRequestEx>(1);
		this.offices$ = this._officesParams.pipe(
			startWith(null),
			switchMap((params: IFindRequestEx | null) =>
				iif(
					() => !!params,
					this._companyService.findOffices(params as IFindRequestEx),
					this._route.data.pipe(map((response) => response.offices))
				)
			)
		);
	}

	public onAddOfficeClick(): void {
		this._modalService
			.openModal<NewOfficeComponent, null, any>(NewOfficeComponent, ModalWidth.M)
			.afterClosed()
			.pipe(withLatestFrom(this._officesParams))
			.subscribe(([result, params]) => {
				// Fix, then backend change to enum
				if (result?.status === 'FullSuccess') {
					this._officesParams.next(params);
				}
			});
	}

	public onPageChange(event: PageEvent): void {
		this._officesParams.next({
			skipCount: event.pageIndex * event.pageSize,
			takeCount: event.pageSize,
		});
	}
}
