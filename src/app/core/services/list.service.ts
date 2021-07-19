import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

import { FindOfficesResponse } from "@data/api/company-service/models";
import { CompanyApiService } from "@data/api/company-service/services";
import { RolesResponse } from "@data/api/rights-service/models";
import { RoleApiService } from "@data/api/rights-service/services";
import { NewOfficeComponent } from "src/app/modules/admin/components/new-office/new-office.component";
import { NewRoleComponent } from "src/app/modules/admin/components/new-role/new-role.component";

@Injectable({
    providedIn: 'root'
})
export class ListService {
    private orderedList: any[] = [];
    private headings: any[] = [];

    constructor(
        private companyApiService: CompanyApiService,
        private roleApiService: RoleApiService
    ) { }

    private getData$(skipCount: number, takeCount: number, instance): Observable<FindOfficesResponse | RolesResponse | any> {
        switch (instance) {
            case 'offices': {
                this.headings = [['city', 'Город'], ['address', 'Адрес'], ['name', 'Название']]
                return this.companyApiService.findOffices({ skipCount, takeCount })
                    .pipe(
                        map(res => (
                            {
                                data: this.orderData(res.offices),
                                totalCount: res.totalCount,
                                headings: this.headings,
                                title: 'Офисы',
                                addButtonText: '+ Добавить офис'
                            }))
                    )
            }
            case 'manage-roles': {
                this.headings = [['name', 'Название'], ['description', 'Описание']]
                return this.roleApiService.findRoles({ skipCount, takeCount })
                    .pipe(
                        map((res) => (
                            {
                                data: this.orderData(res.roles),
                                totalCount: res.totalCount,
                                headings: this.headings,
                                title: 'Роли',
                                addButtonText: '+ Добавить роль'
                            }))
                    )
            }
            default: return of(
                {
                    data: [],
                    totalCount: 0,
                    headings: [],
                    title: '',
                    addButtonText: ''
                })
        }
    }

    private orderData(data) {
        let tempData: any[];
        this.orderedList = [];
        if (data && this.headings) {
            data.forEach(item => {
                tempData = [];
                this.headings.forEach(head => {
                    tempData.push(item[`${head[0]}`]);
                })
                this.orderedList.push(tempData);
            })
        }

        return this.orderedList;
    }

    public getData(skipCount: number, takeCount: number, instance: string): Observable<{ data, totalCount, headings, title, addButtonText }> {
        return this.getData$(skipCount, takeCount, instance)
    }

    public openModal(dialog: MatDialog, instance: string): Observable<any> {
        switch (instance) {
            case 'offices': {
                return dialog.open(NewOfficeComponent).afterClosed()
            }
            case 'manage-roles': {
                return dialog.open(NewRoleComponent).afterClosed()
            }
        }
    }
}