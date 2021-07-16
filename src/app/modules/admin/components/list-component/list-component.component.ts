import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.scss']
})
export class ListComponentComponent implements OnInit, OnChanges {
  @Input() data: any[];
  @Input() headings: any[];

  _headingValues: string[];
  _headingKeys: string[];

  constructor() {
    this._headingKeys = [];
    this._headingValues = [];
   }

  public ngOnInit(): void {
  }

  public ngOnChanges() {
    this.headings.forEach((head) => {
      if(this._headingKeys.length < this.headings.length && this._headingValues.length < this.headings.length) {
      this._headingKeys.push(head[0]);
      this._headingValues.push(head[1]);
      }
    })
    /*
    ** Это чтобы из массива объектов для таблицы достать уникальные ключи и использовать их для заголовков,
    ** если они не передаются из родительской компоненты.
    */
    //this.headings = [...new Set(this.data?.map(item => Object.keys(item)).reduce((item1, item2) => item1.concat(item2)))]
  }

  public objectEntries(obj) {
    // console.log(obj)
    /*
    ** Т.к. передаётся массив объектов, то надо из каждого объекта доставать только те поля, которые соответствуют заголовкам.
    ** 1) Проблема. Поля достаются в том порядке, в котором они в объекте. Вот решения, которые я придумал: 
    ** 1.1) Поменять порядок заголовков в родительской компоненте;
    ** 1.2) Поменять порядок полей на бэкенде;
    ** 1.3) Добавить в этой функции доп логику, которая меняла бы порядок полей в обрабатываемом объекте;
    ** 1.4) Какая-то более продуманная логика, которая синхронизировала бы заголовки и поля вне зависимости от их порядка (скорее всего это + циклы).
    */
    return Object.entries(obj).filter(item => this._headingKeys.includes(item[0])
    );
  }
}
