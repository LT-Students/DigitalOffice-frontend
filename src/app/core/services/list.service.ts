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
import { NewEmployeeComponent } from "src/app/modules/admin/components/new-employee/new-employee.component";
import { NetService } from "./net.service";
import { NewDepartmentComponent } from "src/app/modules/admin/components/new-department/new-department.component";

const OFFICES = 'offices';
const POSITIONS = 'positions'
const MANAGE_ROLES = 'manage-roles'
const MANAGE_USERS = 'manage-users'
const DEPARTMENTS = 'departments'

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
        private netService: NetService,
        private modalService: ModalService
    ) { }

    public getListType(instance: string) {
        switch (instance) {
            case OFFICES: return OFFICES;
            case POSITIONS: return POSITIONS;
            case MANAGE_USERS: return 'users';
            case MANAGE_ROLES: return 'roles';
            case DEPARTMENTS: return 'departments';
        }
    }

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
            case DEPARTMENTS: {
                this.headings = [
                    { headingProperty: 'name', headingName: 'Наименование', type: 'default' },
                    { headingProperty: 'description', headingName: 'Описание', type: 'default' },
                    { headingProperty: 'director', headingName: 'Директор', type: 'default' },
                    { headingProperty: 'users', headingName: 'Количество сотрудников', type: 'default' }
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
            case DEPARTMENTS: {
                return {
                    title: 'Список департаментов',
                    addButtonText: '+ Добавить департамент'
                }
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
                                list: this.orderData(res.offices, 'offices'),
                                totalCount: res.totalCount,
                            }))
                    )
            }
            case MANAGE_ROLES: {
                return this.roleApiService.findRoles({ skipCount, takeCount })
                    .pipe(
                        map((res) => (
                            {
                                list: this.orderData(res.roles, 'roles'),
                                totalCount: res.totalCount,
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
                                list: this.orderData(positions, 'positions'),
                                //@ts-ignore
                                totalCount: res.totalCount,
                            }
                        })
                    )
            }
            case MANAGE_USERS: {
                return this.userApiService.getUsers(skipCount, takeCount)
                    .pipe(
                        map((res) => {
                            return {
                                list: this.orderData(res.users.map(user => ({
                                    id: user.id,
                                    name: user.firstName,
                                    department: user.department?.name,
                                    role: user.role?.name,
                                    rate: user.rate,
                                    status: user.isActive,
                                    shortInfo: user.position?.name,
                                    avatar: user.avatar
                                })), 'users'),
                                totalCount: res.totalCount
                            }
                        })
                    )
            }
            case DEPARTMENTS: {
                return this.netService.getDepartmentsList()
                    .pipe(
                        map((res) => {
                            return {
                                list: this.orderData(res.map(
                                    department => ({
                                        ...department,
                                        name: department.name,
                                        description: department.description,
                                        director: (department.director?.firstName && department.director?.lastName) ?
                                            department.director?.firstName + ' ' + department.director?.lastName : '',
                                        users: department.users.length
                                    })
                                ), 'departments'),
                                totalCount: res.length
                            }
                        })
                    )
            }
            default: return of(
                {
                    list: [],
                    totalCount: 0,
                })
        }
    }

    public getData(skipCount: number, takeCount: number, instance: string): Observable<{ list, totalCount }> {
        return this.getData$(skipCount, takeCount, instance)
    }

    /**
     * Можно расширить для использования другими типами списка
     */
    private setAdditionalProperties(item, type: string) {
        switch (type) {
            case 'users': return {
                avatar: item.avatar,
                status: item.status,
            }
            default: return {}
        }
    }

    private orderData(data, type: string) {
        // Вообще это удобная переменная, которая в данный момент используется для юзеров, но так-то можно и для любого другого типа списков.
        let additionalProperties = {};
        let tempData: any[];
        this.orderedList = [];
        if (data && this.headings) {
            data.forEach(item => {
                additionalProperties = this.setAdditionalProperties(item, type)
                tempData = [];
                this.headings.forEach(head =>
                    tempData.push(
                        {
                            // ...item,
                            ...additionalProperties,
                            mainInfo: item[head.headingProperty],
                            shortInfo: item.shortInfo,
                            type: head.type,
                            headingName: head.headingName
                        })
                );
                this.orderedList.push({ item: tempData, id: item.id });
            })
        }

        return this.orderedList;
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
            case MANAGE_USERS: {
                return this.modalService.openModal(NewEmployeeComponent).afterClosed();
            }
            case DEPARTMENTS: {
                return this.modalService.openModal(NewDepartmentComponent).afterClosed();
            }
        }
    }
}