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


  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  ngOnInit() {
    let allHours = 0;
    for (let i = 0; i < this.projectsData.length; i++) {
      allHours += Number(this.projectsData[i].projectHours);
    }

      this.ctx = this.canvas.nativeElement.getContext('2d');
    var myChart = new Chart(this.ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: this.projectsData.map((project) => project.projectHours),
          backgroundColor: this.colorsData,
          borderWidth: 1

        }]
      },
      options: {
        tooltips: {
          enabled: false
        }
      }

    });
    }
}
