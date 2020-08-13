import { Component, OnInit, Input } from '@angular/core';
import { IProject } from '../../models/project.model';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'do-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Input() projects: Array<IProject>;
  private today = Date.now();

  constructor() { }

  ngOnInit() {
  }

}
