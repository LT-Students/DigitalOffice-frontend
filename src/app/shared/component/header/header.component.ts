import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'do-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  hasNotification = false;
  @Input() userName;
  @Input() magnifierLocation: 'right' | 'left' = 'left';

  constructor() {}

  ngOnInit() {}
}
