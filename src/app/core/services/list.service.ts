import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FindOfficesResponse } from "@data/api/company-service/models";
import { CompanyApiService } from "@data/api/company-service/services";
import { RolesResponse } from "@data/api/rights-service/models";
import { RoleApiService } from "@data/api/rights-service/services";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { NewOfficeComponent } from "src/app/modules/admin/components/new-office/new-office.component";
import { NewRoleComponent } from "src/app/modules/admin/components/new-role/new-role.component";
import { AdminDashboardModalType } from "./modal.service";

@Injectable({
    providedIn: 'root'
})
export class ListService {
    public modalType: typeof AdminDashboardModalType;

    constructor(
        private companyApiService: CompanyApiService,
        private roleApiService: RoleApiService
    ) {
        this.modalType = AdminDashboardModalType;
    }

    private getData$(skipCount: number, takeCount: number, instance): Observable<FindOfficesResponse | RolesResponse | any> {
        switch (instance) {
            case 'offices': {
                return this.companyApiService.findOffices({ skipCount, takeCount })
                    .pipe(
                        map(res => (
                            { 
                                data: res.offices, 
                                totalCount: res.totalCount,
                                headings: [['city', 'Город'], ['address', 'Адрес'], ['name', 'Название']],
                                title: 'Офисы',
                                addButtonText: '+ Добавить офис' 
                            }))
                    )
            }
            case 'manage-roles': {
                return this.roleApiService.findRoles({ skipCount, takeCount })
                    .pipe(
                        map((res) => (
                            { 
                                data: res.roles, 
                                totalCount: res.totalCount,
                                headings: [['name', 'Название'], ['description', 'Описание']],
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

    public getData(skipCount: number, takeCount: number, instance: string): Observable<{ data, totalCount, headings, title, addButtonText }> {
        return this.getData$(skipCount, takeCount, instance)
    }

    public openModal(dialog: MatDialog, instance: string): Observable<any> {
        switch(instance) {
            case 'offices': {
                return dialog.open(NewOfficeComponent).afterClosed()
            }
            case 'manage-roles': {
                return dialog.open(NewRoleComponent).afterClosed()
            }
        }
    }
}