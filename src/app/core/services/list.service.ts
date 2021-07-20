import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

import { FindOfficesResponse } from "@data/api/company-service/models";
import { CompanyApiService, PositionApiService } from "@data/api/company-service/services";
import { RolesResponse } from "@data/api/rights-service/models";
import { RoleApiService } from "@data/api/rights-service/services";
import { NewOfficeComponent } from "src/app/modules/admin/components/new-office/new-office.component";
import { NewRoleComponent } from "src/app/modules/admin/components/new-role/new-role.component";
import { ModalService } from "./modal.service";
import { Heading } from "src/app/modules/admin/components/list/heading-model";
import { NewPositionComponent } from "src/app/modules/admin/components/new-position/new-position.component";
import { UserService } from '@app/services/user.service'

const OFFICES = 'offices';
const POSITIONS = 'positions'
const MANAGE_ROLES = 'manage-roles'
const MANAGE_USERS = 'manage-users'

@Injectable({
    providedIn: 'root'
})
export class ListService {
    // TODO: добавить ещё типов для других используемых интерфейсов
    private orderedList: any[] = [];
    private headings: Heading[] = [];

    constructor(
        private companyApiService: CompanyApiService,
        private roleApiService: RoleApiService,
        private positionApiService: PositionApiService,
        private userApiService: UserService,
        private modalService: ModalService
    ) { }

    public getHeadings(instance: string) {
        switch (instance) {
            case OFFICES: {
                this.headings = [
                    { headingProperty: 'city', headingName: 'Город', type: 'default' },
                    { headingProperty: 'address', headingName: 'Адрес', type: 'default' },
                    { headingProperty: 'name', headingName: 'Название', type: 'default' }
                ];
                return this.headings;
            }
            case MANAGE_ROLES: {
                this.headings = [
                    { headingProperty: 'name', headingName: 'Название', type: 'default' },
                    { headingProperty: 'description', headingName: 'Описание', type: 'default' }
                ];
                return this.headings;
            }
            case POSITIONS: {
                this.headings = [
                    { headingProperty: 'name', headingName: 'Название', type: 'default' },
                    { headingProperty: 'description', headingName: 'Описание', type: 'default' }
                ];
                return this.headings;
            }
            case MANAGE_USERS: {
                this.headings = [
                    { headingProperty: 'name', headingName: 'Имя', type: 'user' },
                    { headingProperty: 'department', headingName: 'Департамент', type: 'default' },
                    { headingProperty: 'role', headingName: 'Роль', type: 'default' },
                    { headingProperty: 'rate', headingName: 'Ставка', type: 'default' },
                    { headingProperty: 'status', headingName: 'Статус', type: 'status' }
                ];
                return this.headings;
            }
            default: return this.headings;
        }
    }

    public getInterfaceText(instance: string) {
        switch (instance) {
            case OFFICES: {
                return {
                    title: 'Офисы',
                    addButtonText: '+ Добавить офис'
                };
            }
            case MANAGE_ROLES: {
                return {
                    title: 'Роли',
                    addButtonText: '+ Добавить роль'
                };
            }
            case POSITIONS: {
                return {
                    title: 'Должности',
                    addButtonText: '+ Добавить должность'
                };
            }
            case MANAGE_USERS: {
                return {
                    title: 'Сотрудники',
                    addButtonText: '+ Добавить сотрудника'
                };
            }
            default: {
                return {
                    title: '',
                    addButtonText: ''
                };
            }
        }
    }

    private getData$(skipCount: number, takeCount: number, instance: string): Observable<FindOfficesResponse | RolesResponse | any> {
        switch (instance) {
            case OFFICES: {
                return this.companyApiService.findOffices({ skipCount, takeCount })
                    .pipe(
                        map(res => (
                            {
                                data: this.orderData(res.offices),
                                totalCount: res.totalCount,
                                type: 'offices'
                            }))
                    )
            }
            case MANAGE_ROLES: {
                return this.roleApiService.findRoles({ skipCount, takeCount })
                    .pipe(
                        map((res) => (
                            {
                                data: this.orderData(res.roles),
                                totalCount: res.totalCount,
                                type: 'roles'
                            }))
                    )
            }
            case POSITIONS: {
                return this.positionApiService.findPositions({ skipCount, takeCount })
                    .pipe(
                        map((res) => {
                            let positions = []
                            res.forEach(position => positions.push(position.info))
                            return {
                                data: this.orderData(positions),
                                //@ts-ignore
                                totalCount: res.totalCount,
                                type: 'positions'
                            }
                        })
                    )
            }
            case MANAGE_USERS: {
                return this.userApiService.getUsers(skipCount, takeCount)
                    .pipe(
                        map((res) => {
                            return {
                                data: this.orderData(res.users.map(user => ({
                                    ...user,
                                    name: user.firstName,
                                    department: user.department?.name,
                                    role: user.role?.name,
                                    rate: user.rate,
                                    status: user.isActive,
                                    shortInfo: user.about,
                                    avatar: user.avatar
                                }))),
                                totalCount: res.totalCount,
                                type: 'users'
                            }
                        })
                    )
            }
            default: return of(
                {
                    data: [],
                    totalCount: 0,
                })
        }
    }

    private orderData(data) {
        console.log('DATA: ', data)
        let tempData: any[];
        this.orderedList = [];
        console.log('headings: ', this.headings)
        if (data && this.headings) {
            data.forEach(item => {
                console.log('item: ', item)
                tempData = [];
                this.headings.forEach(head => tempData.push(
                    {
                        ...item,
                        mainInfo: item[head.headingProperty],
                        shortInfo: item.shortInfo,
                        avatar: item.avatar,
                        status: item.status,
                        type: head.type
                    }));
                this.orderedList.push({ data: tempData, id: item.id });
            })
        }

        console.log('ORDERED: ', this.orderedList)
        return this.orderedList;
    }

    public getData(skipCount: number, takeCount: number, instance: string): Observable<{ data, totalCount, type }> {
        return this.getData$(skipCount, takeCount, instance)
    }

    public openModal(instance: string): Observable<any> {
        switch (instance) {
            case OFFICES: {
                return this.modalService.openModal(NewOfficeComponent).afterClosed();
            }
            case MANAGE_ROLES: {
                return this.modalService.openModal(NewRoleComponent).afterClosed();
            }
            case POSITIONS: {
                return this.modalService.openModal(NewPositionComponent).afterClosed();
            }
        }
    }
}