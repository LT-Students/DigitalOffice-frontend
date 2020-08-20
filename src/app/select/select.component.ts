import {Component, Input} from '@angular/core';

@Component({
  selector: 'do-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})

export class SelectComponent {

  @Input() options: string[];
  @Input() className: string;
  @Input() title: string;

  constructor() {}


}

