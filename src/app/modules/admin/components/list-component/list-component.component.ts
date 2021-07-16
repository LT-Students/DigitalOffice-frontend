import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.scss']
})
export class ListComponentComponent implements OnInit, OnChanges {
  @Input() public data: any[];

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

  constructor() {
    this._orderedList = [];
  }

  public ngOnInit(): void {
    console.log('OnInit');
    console.log('data: ', this.data);
    console.log('headings: ', this.headings);
  }

  public ngOnChanges() {
    this._orderedList = [];
    console.log('OnChanges')

    if (this.data && this.headings) {
      console.log('Заголовки: ', this.headings)
      this.data.forEach(item => {
        let datas = [];
        this.headings.forEach(head => {
          datas.push(item[`${head[0]}`]);
        })
        this._orderedList.push(datas);
      })
    }

    console.log('Ordered list: ', this._orderedList)
  }
}
