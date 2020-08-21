import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-hours',
  templateUrl: './add-hours.component.html',
  styleUrls: ['./add-hours.component.scss']
})
export class AddHoursComponent implements OnInit {

  public user = {
    projects: ['Ромашка', 'Рога и копыта']
  }

  constructor() { }

  ngOnInit() {
  }

}
