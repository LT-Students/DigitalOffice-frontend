import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';

import { ListService, ListType } from '@app/services/list.service';
import { Observable } from 'rxjs';
import { Heading } from './heading-model'

@Component({
  selector: 'do-list-component',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  /**
    * totalCount - общее количество записей.
    */
  public totalCount: number;
  /**
   * title - тайтл таблицы.
   */
  public title: string;
  /**
   * addButtonText - текст для кнопки добавления сущности.
   */
  public addButtonText: string;
  /**
   * data - записи для таблицы.
   */
  public list: any[];
  /**
   * headings - заголовки таблицы.
   * headings имеет вид: [['propertyName', 'propertyValue'], [...], [...], ...]
   * propertyName - это название свойства, по которому доступно значение для заголовка.
   * propertyValue - это текст, который отображается на месте заголовка.
   * Порядок заголовков соответствует порядку элементов headings.
   */
  public headings: Heading[];
  /**
   * Переменные для пагинации.
   */
  public pageSize: number;
  public pageIndex: number;
  /**
   * Содержит текущий путь url.
   */
  public path: string
  /**
   * описывает текущий тип сущностей (офис, пользователь, роли и т.д.)
   */
  public listType: ListType

  constructor(
    private listService: ListService,
    private activatedRoute: ActivatedRoute,
    private _router: Router) {
    this.totalCount = 0;
    this.pageSize = 10;
    this.pageIndex = 0;
    this.list = [];
    this.path = this.activatedRoute.routeConfig.path;
  }

  public ngOnInit(): void {
    this.listType = this.listService.getListType(this.path);

    const { title, addButtonText } = this.listService.getInterfaceText(this.listType)
    this.title = title;
    this.addButtonText = addButtonText;
    this.headings = this.listService.getHeadings(this.listType)
    this._getData();
  }

  public onAddButtonClick(): void {
    this.listService.onAddClick(this.listType).subscribe(() => {
      this._getData()
    });
  }

  public isActive(): boolean {
    switch (this.listType) {
      case ListType.DEPARTMENTS: return true;
      case ListType.MANAGE_USERS: return true;
      case ListType.PROJECTS: return true;
      default: return false;
    }
  }

  public showMoreInfo(record): void {
    switch (this.listType) {
      case ListType.MANAGE_USERS: {
        this._router.navigate([`/user/${record.id}`])
        return;
      }
      case ListType.DEPARTMENTS: {
        this._router.navigate([`/department/${record.id}`])
        return;
      }
      case ListType.PROJECTS: {
        this._router.navigate([`/project/${record.id}`])
      }
    }
  }

  public onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this._getData()
  }

  private _getData(): void {
    this.listService.getData(this.pageIndex * this.pageSize, this.pageSize, this.listType).subscribe(
      data => {
        console.log(data.list)
        this.list = data.list;
        this.totalCount = data.totalCount;
      })
  }
}
