//@ts-nocheck
import { Component } from '@angular/core';

@Component({
  selector: 'do-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public user = {
    firstName: 'Ия',
  };
}
