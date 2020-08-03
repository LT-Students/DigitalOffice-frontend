import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'do-button',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {

  @Input() className: string;
  @Input() title: string;

  constructor() { }
  ngOnInit() {
  }

}
