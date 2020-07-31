import {Component, Input, OnInit} from '@angular/core';
import { ElementRef} from "@angular/core";
import { ViewChild} from "@angular/core";
import {count} from "rxjs/operators";
import { Chart } from 'chart.js';

@Component({
  selector: 'do-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})

export class ChartComponent implements OnInit {
  constructor() { }
  @Input() projectsData;               //Data about projectsName and projectsHours
  @Input() allHoursPlan;               //Hours of plan
  @Input() timeDescrValue;             //Difference between hours in the center under hours

  colorsData = ["#7C799B", "#C7C6D8", "#FFB2B2", "#FFB78C", "#EB5757", "#BC7BFA", "#FFBE97", "#BDBDBD"];

  //variables for hours in the center
  allHoursPerfom;
  allHoursPrint;
  allHoursColor;
  //

  //variables for string under hours in the center of the chart
  timeDescrBackgroundColor;
  timeDescrFontSize;
  timeDescrColor;
  //

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  ngOnInit() {
    //calculating the total number of hours in the center of chart

    this.allHoursPerfom = new Date();
    this.allHoursPerfom = 0;
    for (let i = 0; i < this.projectsData.length; i++) {
      this.allHoursPerfom += Number (this.projectsData[i].projectHours);
    }
    //

    //donut building
    this.ctx = this.canvas.nativeElement.getContext('2d');

    if (this.allHoursPerfom > 0) {

      //Hours in the center
      this.allHoursPrint = this.allHoursPerfom;
      this.allHoursColor = "#434348";
      //

      //String under hours
      this.timeDescrColor = "#FFFFFF";
      this.timeDescrValue >= 0 ? this.timeDescrBackgroundColor = "#21D373" : this.timeDescrBackgroundColor = "#EB5757";
      this.timeDescrFontSize = "16px";
      //

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
    } else {

      //Hours in the center
      this.allHoursPrint = this.allHoursPlan;
      this.allHoursColor = "#BDBDBD";
      //

      //String under hours
      this.timeDescrValue = "Запаланированно";
      this.timeDescrBackgroundColor = "#FFFFFF";
      this.timeDescrColor = "#BDBDBD";
      this.timeDescrFontSize = "14px";
      //

      var myChart = new Chart(this.ctx, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [1],
            backgroundColor: "#F1F1EF",
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
}
