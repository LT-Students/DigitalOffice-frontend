import {Component, Input} from '@angular/core';




@Component({
  selector: 'app-select',
  templateUrl: './do-select.component.html',
  styleUrls: ['./do-select.component.scss'],


})
export class DoSelectComponent {

 @Input() pro;
  optionsPro = ['first', 'second'];
  @Input() options: string[];
  @Input() className: string;
  @Input() title: string;

  constructor() {}


}

