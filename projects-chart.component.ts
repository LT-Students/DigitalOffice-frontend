import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects-chart',
  templateUrl: './projects-chart.component.html',
  styleUrls: ['./projects-chart.component.scss']
})
export class ProjectsChartComponent implements OnInit {

  constructor() { }
  segments = [
    {stroke: '#FFB2B2', dasharray: '20 80', dashoffset: '0'},
    {stroke: '#C7C6D8', dasharray: '20 80', dashoffset: '-20'},
    {stroke: '#7C799B', dasharray: '60 40', dashoffset: '-40'},
  ];
  ngOnInit() {
  }
}
