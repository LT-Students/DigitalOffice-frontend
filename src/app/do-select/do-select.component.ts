import {Component, Input} from '@angular/core';




@Component({
  selector: 'do-select',
  templateUrl: './do-select.component.html',
  styleUrls: ['./do-select.component.scss'],


})
export class DoSelectComponent {

  @Input() options: string[];
  @Input() className: string;
  @Input() title: string;

  constructor() {}


}

