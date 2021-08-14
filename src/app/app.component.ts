//@ts-nocheck
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'do-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public user = {
    firstName: 'Ия',
  };
}
