import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  hasNotification = false;
  isDarkMood = true;
  @Input() userName;
  constructor() { }

  ngOnInit() {
  }

  onClickNotification() {
    this.hasNotification = !this.hasNotification;
  }
  onClickMood() {
    this.isDarkMood = !this.isDarkMood;
  }
}
