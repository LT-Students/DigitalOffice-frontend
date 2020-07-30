import { Component, OnInit } from '@angular/core';
import { ElementRef} from "@angular/core";
import { ViewChild} from "@angular/core";
import {count} from "rxjs/operators";
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})

export class ChartComponent implements OnInit {
  constructor() { }

  colorsData = ["#7C799B", "#C7C6D8", "#FFB2B2", "#FFB78C", "#EB5757", "#BC7BFA", "#FFBE97", "#BDBDBD"];

  projectsData = [
    {projectName: "Kojima", projectHours: "10.26"},
    {projectName: "First", projectHours: "35.7"},
    {projectName: "Something", projectHours: "15.3"},
    {projectName: "Else", projectHours: "15"},
    ];

  allHoursValue
  hoursDiffValue = -0.03
  backgroundColor

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  ngOnInit() {
    //calculating the total number of hours in the center of chart
    this.allHoursValue = 0;
    for (let i = 0; i < this.projectsData.length; i++) {
      this.allHoursValue += Number(this.projectsData[i].projectHours);
    }
    //

    //defining the background-color for the square in the center of the chart
    if (this.allHoursValue > 0) {
      this.backgroundColor = "#21D373";
    } else {
      this.backgroundColor = "#EB5757";
    }
    //

    //donut building
      this.ctx = this.canvas.nativeElement.getContext('2d');
    var myChart = new Chart(this.ctx, {
      type: 'doughnut',

      data: {
        datasets: [{
          data: this.projectsData.map((project) => project.projectHours),
          backgroundColor: this.colorsData,
          borderWidth: 0,
        }]
      },
      options: {
        cutoutPercentage: 70,
        tooltips: {
          enabled: false
        }
      }
    });
    }
}
