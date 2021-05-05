import { Input, Component, OnInit } from '@angular/core';
import { AuthApiService } from '@data/api/auth-service/services';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'do-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  hasNotification = false;
  //_authService:AuthService;
  @Input() userName;
  @Input() magnifierLocation: 'right' | 'left' = 'left';

  constructor( private authService:AuthService ) {

  }

  ngOnInit() {}

  doLogout(){
    console.log("do logout");
    this.authService.logout();
  }

  
}
