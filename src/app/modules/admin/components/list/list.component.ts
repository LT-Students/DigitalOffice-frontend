import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ListService } from '@app/services/list.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  public list: any;
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
  public listType: string

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
    const { title, addButtonText } = this.listService.getInterfaceText(this.path)
    this.title = title;
    this.addButtonText = addButtonText;
    this.headings = this.listService.getHeadings(this.path)
    this.listType = this.listService.getListType(this.path);
    this._getData();
  }

  public onAddButtonClick(): void {
    this.listService.openModal(this.path).subscribe(() => {
      this._getData()
    });
  }

  public isActive() {
    switch (this.listType) {
      case 'users': return true;
      case 'departments': return true;
      default: return false;
    }
  }

  public showMoreInfo(record) {
    switch (this.listType) {
      case 'users': {
        this._router.navigate([`/user/${record.id}`])
        return;
      }
      case 'departments': {
        this._router.navigate([`/department/${record.id}`])
        return;
      }
    }
  }

  public onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this._getData()
  }

  private _getData() {
    this.listService.getData(this.pageIndex * this.pageSize, this.pageSize, this.activatedRoute.routeConfig.path).subscribe(
      data => {
        this.list = data.list;
        this.totalCount = data.totalCount;
      })
  }
}
