import {Component, Input, OnInit} from '@angular/core';
import { ElementRef} from "@angular/core";
import { ViewChild} from "@angular/core";
import {count, min} from "rxjs/operators";
import { Chart } from 'chart.js';
import * as moment from 'moment';

@Component({
  selector: 'do-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})

export class ChartComponent implements OnInit {
  constructor() { }
  @Input() projectsData;               //Data about projectsName and projectsHours
  @Input() allHoursPlan;               //Hours of plan
  @Input() timeDescriptionValue;       //Difference between hours in the center under hours

  colorsData = ["#7C799B", "#C7C6D8", "#FFB2B2", "#FFB78C", "#EB5757", "#BC7BFA", "#FFBE97", "#BDBDBD"];

  //variables for hours in the center
  allHoursPerfom;
  allHours;
  allHoursColor;
  //

  //variables for string under hours in the center of the chart
  timeDescriptionBackgroundColor;
  timeDescriptionFontSize;
  timeDescriptionColor;
  //

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  ngOnInit() {
    //calculating the total number of hours in the center of chart
    this.allHoursPerfom = moment.duration("00:00");
    for (let i = 0; i < this.projectsData.length; i++) {
      this.allHoursPerfom.add(this.projectsData[i].projectHours, "hours");
    }
    //

    //donut building
    this.ctx = this.canvas.nativeElement.getContext('2d');

    if (this.allHoursPerfom > 0) {

      //Hours in the center
      this.allHours = this.allHoursPerfom;
      this.allHoursColor = "#434348";
      //

      //String under hours
      this.timeDescriptionColor = "#FFFFFF";
      this.timeDescriptionValue >= 0 ? this.timeDescriptionBackgroundColor = "#21D373" : this.timeDescriptionBackgroundColor = "#EB5757";
      this.timeDescriptionFontSize = "16px";
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
      this.allHours = this.allHoursPerfom;
      this.allHoursColor = "#BDBDBD";
      //

      //String under hours
      this.timeDescriptionValue = "Запаланированно";
      this.timeDescriptionBackgroundColor = "#FFFFFF";
      this.timeDescriptionColor = "#BDBDBD";
      this.timeDescriptionFontSize = "14px";
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
