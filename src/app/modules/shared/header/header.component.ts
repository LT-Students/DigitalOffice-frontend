import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'do-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  hasNotification = false;
  isDarkMode = true;
  @Input() userName;

  constructor() {}

  ngOnInit() {}
}
