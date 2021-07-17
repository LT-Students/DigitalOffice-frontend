import { Component, Input, Output, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.scss']
})
export class ListComponentComponent implements OnInit, OnChanges {
  /**
   * onAddClick - событие для триггера функции в родителськой компоненте для создания сущности. 
   */
  @Output() public onAddClick = new EventEmitter();
  /**
    * totalCount - общее количество записей.
    */
  @Input() public totalCount: number;
  /**
   * title - тайтл таблицы.
   */
  @Input() public title: string;
  /**
   * addButtonText - текст для кнопки добавления сущности.
   */
  @Input() public addButtonText: string;
  /**
   * data - записи для таблицы.
   */
  @Input() public data: any[];
  /**
   * getDataList - коллбек для триггера родителя для получения записей.
   */
  @Input() public getDataList;
  /**
   * headings - заголовки таблицы.
   * headings имеет вид: [['propertyName', 'propertyValue'], [...], [...], ...]
   * propertyName - это название свойства, по которому доступно значение для заголовка.
   * propertyValue - это текст, который отображается на месте заголовка.
   * Порядок заголовков соответствует порядку элементов headings.
   */
  @Input() public headings: any[];
  /**
   * _orderedList - массив записей, состоящий из подмассивов, где элементы расположены в соответствие с порядком заголовков.
   * _orderedList имеет вид: [['heading1_value', 'heding2_value', 'heading3_value', ...], [...], [...], ...]
   */
  public _orderedList: any[];
  /**
   * Вспомогательные переменные.
   */
  public pageSize: number;
  public pageIndex: number;
  public tempData: any[];

  constructor(private dialog: MatDialog) {
    this._orderedList = [];
    this.tempData = [];
    this.data = [];
    this.totalCount = 0;
    this.pageSize = 10;
    this.pageIndex = 0;
  }

  public ngOnInit(): void {
    this.getDataList({ skipCount: this.pageIndex * this.pageSize, takeCount: this.pageSize })
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.data?.currentValue !== changes.data?.previousValue) {
      this._orderedList = [];
      if (this.data && this.headings) {
        this.data.forEach(item => {
          this.tempData = [];
          this.headings.forEach(head => {
            this.tempData.push(item[`${head[0]}`]);
          })
          this._orderedList.push(this.tempData);
        })
      }
    }
  }

  public onAddButtonClick(): void {
    this.onAddClick.emit({ skipCount: this.pageIndex * this.pageSize, takeCount: this.pageSize, dialog: this.dialog })
  }

  public onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getDataList({ skipCount: this.pageIndex * this.pageSize, takeCount: this.pageSize })
  }
}
