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

  colorsData = ["#7C799B", "#C7C6D8", "#FFB2B2", "#000000"];

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
