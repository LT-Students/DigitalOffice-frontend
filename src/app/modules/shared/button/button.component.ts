import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'do-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() className: string;
  @Input() title: string;

  constructor() { }
  ngOnInit() {
  }

}
