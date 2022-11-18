import { Injectable } from '@angular/core';
import { MAX_INT32 } from '@app/utils/utils';
import { map } from 'rxjs/operators';
import { DepartmentInfo } from '@api/department-service/models/department-info';
import { Observable } from 'rxjs';
import { DepartmentService } from '@app/services/department/department.service';
import { OfficeApiService } from '@api/office-service/services/office-api.service';
import { PositionApiService } from '@api/position-service/services/position-api.service';
import { RoleApiService } from '@api/rights-service/services/role-api.service';
import { ContractSubjectApiService } from '@api/company-service/services/contract-subject-api.service';
import { OfficeInfo } from '@api/office-service/models/office-info';
import { PositionInfo } from '@api/position-service/models/position-info';
import { RoleInfo } from '@api/rights-service/models/role-info';
import { ContractSubjectInfo } from '@api/company-service/models/contract-subject-info';

export interface AutocompleteConfig<T> {
	options$: Observable<T[]>;
	valueGetter: (o?: T) => any;
	displayWithFn: (o?: T) => string;
	filterFn: (filterValue: string, options: T[]) => T[];
}

const FIND_PARAMS = { skipCount: 0, takeCount: MAX_INT32 };

@Injectable({
	providedIn: 'root',
})
export class AutocompleteConfigsService {
	constructor(
		private departmentService: DepartmentService,
		private officeService: OfficeApiService,
		private positionService: PositionApiService,
		private roleService: RoleApiService,
		private contractService: ContractSubjectApiService
	) {}

	public getDepartmentsConfig(): AutocompleteConfig<DepartmentInfo> {
		return {
			options$: this.departmentService
				.findDepartments(FIND_PARAMS)
				.pipe(map((res) => res.body as DepartmentInfo[])),
			valueGetter: (d?: DepartmentInfo) => d?.id || null,
			displayWithFn: (d?: DepartmentInfo) => d?.shortName || '',
			filterFn: (v: string, options: DepartmentInfo[]) => {
				v = v.toLowerCase();
				return options.filter(
					(d: DepartmentInfo) => d.shortName.toLowerCase().includes(v) || d.name.toLowerCase().includes(v)
				);
			},
		};
	}

	public getOfficesConfig(): AutocompleteConfig<OfficeInfo> {
		return {
			options$: this.officeService.findOffices(FIND_PARAMS).pipe(map((res) => res.body as OfficeInfo[])),
			valueGetter: (o?: OfficeInfo) => o?.id || null,
			displayWithFn: (o?: OfficeInfo) => o?.address || '',
			filterFn: (v: string, options: OfficeInfo[]) => {
				v = v.toLowerCase();
				return options.filter((o: OfficeInfo) => o.address.toLowerCase().includes(v));
			},
		};
	}

	public getPositionsConfig(): AutocompleteConfig<PositionInfo> {
		const { skipCount, takeCount } = FIND_PARAMS;
		return {
			options$: this.positionService
				.findPositions({ skipcount: skipCount, takecount: takeCount, includeDeactivated: false })
				.pipe(map((res) => res.body as PositionInfo[])),
			valueGetter: (p?: PositionInfo) => p?.id || null,
			displayWithFn: (p?: PositionInfo) => p?.name || '',
			filterFn: (v: string, options: PositionInfo[]) => {
				v = v.toLowerCase();
				return options.filter((p: PositionInfo) => p.name.toLowerCase().includes(v));
			},
		};
	}

	public getRolesConfig(): AutocompleteConfig<RoleInfo> {
		return {
			options$: this.roleService
				.findRoles({ ...FIND_PARAMS, locale: 'ru' })
				.pipe(map((res) => res.body as RoleInfo[])),
			valueGetter: (r?: RoleInfo) => r?.id || null,
			displayWithFn: (r?: RoleInfo) => r?.localizations?.[0].name || '',
			filterFn: (v: string, options: RoleInfo[]) => {
				v = v.toLowerCase();
				return options.filter((r: RoleInfo) => r.localizations?.[0].name.toLowerCase().includes(v));
			},
		};
	}

	public getContractsConfig(): AutocompleteConfig<ContractSubjectInfo> {
		return {
			options$: this.contractService
				.findContractSubjects(FIND_PARAMS)
				.pipe(map((res) => res.body as ContractSubjectInfo[])),
			valueGetter: (c?: ContractSubjectInfo) => c?.id || null,
			displayWithFn: (c?: ContractSubjectInfo) => c?.name || '',
			filterFn: (v: string, options: ContractSubjectInfo[]) => {
				v = v.toLowerCase();
				return options.filter((c: ContractSubjectInfo) => c.name.toLowerCase().includes(v));
			},
		};
	}
}
