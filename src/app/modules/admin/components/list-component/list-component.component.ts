import { Component, Input, Output, OnChanges, OnInit, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ListService } from '@app/services/list.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.scss']
})
export class ListComponentComponent {
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
  public data: any[];
  /**
   * headings - заголовки таблицы.
   * headings имеет вид: [['propertyName', 'propertyValue'], [...], [...], ...]
   * propertyName - это название свойства, по которому доступно значение для заголовка.
   * propertyValue - это текст, который отображается на месте заголовка.
   * Порядок заголовков соответствует порядку элементов headings.
   */
  public headings: any[];
  /**
   * Вспомогательные переменные.
   */
  public pageSize: number;
  public pageIndex: number;
  public tempData: any[];

  constructor(
    private dialog: MatDialog,
    private listService: ListService,
    private activatedRoute: ActivatedRoute) {
    this.tempData = [];
    this.totalCount = 0;
    this.pageSize = 10;
    this.pageIndex = 0;
    this.data = [];
  }

  public ngOnInit(): void {
    this._getData();
  }

  public ngOnChanges(changes: SimpleChanges): void { }

  public onAddButtonClick(): void {
    this.listService.openModal(this.dialog, this.activatedRoute.routeConfig.path).subscribe(() => {
      this._getData()
    });
  }

  public onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this._getData()
  }

  private _getData() {
    this.listService.getData(this.pageIndex * this.pageSize, this.pageSize, this.activatedRoute.routeConfig.path).subscribe(
      data => {
        console.log('Data: ', data);
        this.data = data.data;
        this.totalCount = data.totalCount;
        this.headings = data.headings;
        this.title = data.title;
        this.addButtonText = data.addButtonText;
      })
  }
}
