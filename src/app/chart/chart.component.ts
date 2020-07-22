import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  public ChartLabel = ['Kolima', 'Меркурий', 'Ромашка'];
  public ChartType = 'doughnut';
  public ChartData = [70, 39, 20];

  constructor() { }

  ngOnInit() {
  }
}
