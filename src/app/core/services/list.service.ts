import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

import { RoleApiService } from "@data/api/rights-service/services";
import { ModalService } from "./modal.service";
import { UserService } from './user.service'
import { NetService } from "./net.service";
import { ProjectService } from './project.service';

import { Heading } from "src/app/modules/admin/components/list/heading-model";

import { NewDepartmentComponent } from "src/app/modules/admin/components/new-department/new-department.component";
import { NewOfficeComponent } from "src/app/modules/admin/components/new-office/new-office.component";
import { NewRoleComponent } from "src/app/modules/admin/components/new-role/new-role.component";
import { NewPositionComponent } from "src/app/modules/admin/components/new-position/new-position.component";
import { NewEmployeeComponent } from "src/app/modules/admin/components/new-employee/new-employee.component";
import { Router } from "@angular/router";

export enum ListType {
    OFFICES,
    POSITIONS,
    MANAGE_ROLES,
    MANAGE_USERS,
    DEPARTMENTS,
    PROJECTS
}

@Injectable({
    providedIn: 'root'
})
export class ListService {
    // TODO: добавить ещё типов для других используемых интерфейсов
    private orderedList: any[] = [];
    private headings: Heading[] = [];

    constructor(
        private roleApiService: RoleApiService,
        private userApiService: UserService,
        private netService: NetService,
        private modalService: ModalService,
        private projectService: ProjectService,
        private router: Router
    ) { }

    public getListType(instance: string): ListType {
        console.log(instance)
        switch (instance) {
            case 'offices': return ListType.OFFICES;
            case 'positions': return ListType.POSITIONS;
            case 'manage-users': return ListType.MANAGE_USERS;
            case 'manage-roles': return ListType.MANAGE_ROLES;
            case 'departments': return ListType.DEPARTMENTS;
            case 'projects-table': return ListType.PROJECTS;
        }
    }

    public getHeadings(instance: ListType): Heading[] {
        switch (instance) {
            case ListType.OFFICES: {
                this.headings = [
                    { headingProperty: 'city', headingName: 'Город', type: 'default' },
                    { headingProperty: 'address', headingName: 'Адрес', type: 'default' },
                    { headingProperty: 'name', headingName: 'Название', type: 'default' }
                ];
                return this.headings;
            }
            case ListType.MANAGE_ROLES: {
                this.headings = [
                    { headingProperty: 'name', headingName: 'Название', type: 'default' },
                    { headingProperty: 'description', headingName: 'Описание', type: 'default' }
                ];
                return this.headings;
            }
            case ListType.POSITIONS: {
                this.headings = [
                    { headingProperty: 'name', headingName: 'Название', type: 'default' },
                    { headingProperty: 'description', headingName: 'Описание', type: 'default' }
                ];
                return this.headings;
            }
            case ListType.MANAGE_USERS: {
                this.headings = [
                    { headingProperty: 'name', headingName: 'Имя', type: 'user' },
                    { headingProperty: 'department', headingName: 'Департамент', type: 'default' },
                    { headingProperty: 'role', headingName: 'Роль', type: 'default' },
                    { headingProperty: 'rate', headingName: 'Ставка', type: 'default' },
                    { headingProperty: 'status', headingName: 'Статус', type: 'status' }
                ];
                return this.headings;
            }
            case ListType.DEPARTMENTS: {
                this.headings = [
                    { headingProperty: 'name', headingName: 'Наименование', type: 'default' },
                    { headingProperty: 'description', headingName: 'Описание', type: 'default' },
                    { headingProperty: 'director', headingName: 'Директор', type: 'default' },
                    { headingProperty: 'users', headingName: 'Количество сотрудников', type: 'default' }
                ];
                return this.headings;
            }
            case ListType.PROJECTS: {
                this.headings = [
                    { headingProperty: 'name', headingName: 'Наименование', type: 'default' },
                    { headingProperty: 'description', headingName: 'Описание', type: 'default' },
                    { headingProperty: 'department', headingName: 'Департамент', type: 'default' }
                ]
            }
            default: return this.headings;
        }
    }

    public getInterfaceText(instance: ListType): { title, addButtonText } {
        switch (instance) {
            case ListType.OFFICES: {
                return {
                    title: 'Офисы',
                    addButtonText: '+ Добавить офис'
                };
            }
            case ListType.MANAGE_ROLES: {
                return {
                    title: 'Роли',
                    addButtonText: '+ Добавить роль'
                };
            }
            case ListType.POSITIONS: {
                return {
                    title: 'Должности',
                    addButtonText: '+ Добавить должность'
                };
            }
            case ListType.MANAGE_USERS: {
                return {
                    title: 'Сотрудники',
                    addButtonText: '+ Добавить сотрудника'
                };
            }
            case ListType.DEPARTMENTS: {
                return {
                    title: 'Список департаментов',
                    addButtonText: '+ Добавить департамент'
                }
            }
            case ListType.PROJECTS: {
                return {
                    title: 'Доска проектов',
                    addButtonText: '+ Создать проект'
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

    private getData$(skipCount: number, takeCount: number, instance: ListType): Observable<{ list, totalCount }> {
        switch (instance) {
            case ListType.OFFICES: {
                return this.netService.getOfficesList({ skipCount, takeCount })
                    .pipe(
                        map(res => (
                            {
                                list: this.orderData(res.body, ListType.OFFICES),
                                totalCount: res.totalCount,
                            }))
                    )
            }
            case ListType.MANAGE_ROLES: {
                return this.roleApiService.findRoles({ skipCount, takeCount })
                    .pipe(
                        map((res) => (
                            {
                                list: this.orderData(res.roles, ListType.MANAGE_ROLES),
                                totalCount: res.totalCount,
                            }))
                    )
            }
            case ListType.POSITIONS: {
                return this.netService.getPositionsList({ skipCount, takeCount })
                    .pipe(
                        map((res) => {
                            return {
                                list: this.orderData(res.body, ListType.POSITIONS),
                                totalCount: res.totalCount,
                            }
                        })
                    )
            }
            case ListType.MANAGE_USERS: {
                return this.userApiService.getUsers(skipCount, takeCount)
                    .pipe(
                        map((res) => {
                            return {
                                list: this.orderData(res.body.map(user => ({
                                    id: user.id,
                                    name: (user.firstName && user.lastName) ? user.firstName + ' ' + user.lastName : '',
                                    department: user.department?.name,
                                    role: user.role?.name,
                                    rate: user.rate,
                                    status: user.isActive,
                                    shortInfo: user.position?.name,
                                    avatar: user.avatar
                                })), ListType.MANAGE_USERS),
                                totalCount: res.totalCount
                            }
                        })
                    )
            }
            case ListType.DEPARTMENTS: {
                return this.netService.getDepartmentsList({ skipCount, takeCount })
                    .pipe(
                        map((res) => {
                            return {
                                list: this.orderData(res.body.map(
                                    department => ({
                                        ...department,
                                        name: department.name,
                                        description: department.description,
                                        director: (department.director?.firstName && department.director?.lastName) ?
                                            department.director?.firstName + ' ' + department.director?.lastName : '',
                                        users: department.countUsers
                                    })
                                ), ListType.DEPARTMENTS),
                                totalCount: res.totalCount
                            }
                        })
                    )
            }
            case ListType.PROJECTS: {
                return this.projectService.getProjectList(skipCount, takeCount)
                    .pipe(
                        map(res => {
                            return {
                                list: this.orderData(res.body.map(proj => ({ ...proj, department: proj.department?.name })), ListType.PROJECTS),
                                totalCount: res.totalCount
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

    public getData(skipCount: number, takeCount: number, instance: ListType): Observable<{ list, totalCount }> {
        return this.getData$(skipCount, takeCount, instance)
    }

    /**
     * Можно расширить для использования другими типами списка
     */
    private setAdditionalProperties(item, type: ListType) {
        switch (type) {
            case ListType.MANAGE_USERS: return {
                avatar: item.avatar,
                status: item.status,
            }
            default: return {}
        }
    }

    private orderData(data, type: ListType) {
        // Вообще это удобная переменная, которая в данный момент используется для юзеров, но так-то можно и для любого другого типа списков.
        console.log('DATA: ', data)
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

    public onAddClick(instance: ListType) {
        switch (instance) {
            case ListType.OFFICES: {
                return this.modalService.openModal(NewOfficeComponent).afterClosed();
            }
            case ListType.MANAGE_ROLES: {
                return this.modalService.openModal(NewRoleComponent).afterClosed();
            }
            case ListType.POSITIONS: {
                return this.modalService.openModal(NewPositionComponent).afterClosed();
            }
            case ListType.MANAGE_USERS: {
                return this.modalService.openModal(NewEmployeeComponent).afterClosed();
            }
            case ListType.DEPARTMENTS: {
                return this.modalService.openModal(NewDepartmentComponent).afterClosed();
            }
            case ListType.PROJECTS: {
                return of(this.router.navigate(['admin/new-project']));
            }
        }
    }
}