import { Component, OnInit } from '@angular/core';
import { ElementRef} from "@angular/core";
import { ViewChild} from "@angular/core";
import {count} from "rxjs/operators";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})

export class ChartComponent implements OnInit {
  constructor() { }

  colorsData = ["#7C799B", "#C7C6D8", "#FFB2B2", "#000000"];

  projectsData = [
    {projectName: "Kojima", projectHours: "50.2"},
    {projectName: "First", projectHours: "35.7"},
    {projectName: "Something", projectHours: "15.3"},
    {projectName: "Else", projectHours: "15"},
    ];

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    let allHours = 0;
    for (let i = 0; i < this.projectsData.length; i++){
      allHours += Number(this.projectsData[i].projectHours);
    }

    //Chart bilding
    let startAngle = 0;
    let chartCenter = 300;
    let chartRadius = 200;
    for (let i = 0; i < this.projectsData.length; i++){

      let theAngle = (2 * Math.PI * Number (this.projectsData[i].projectHours)) / allHours;

      //sector of donut
      this.ctx.lineWidth = chartRadius * 0.35;
      this.ctx.strokeStyle = this.colorsData[i];
      this.ctx.arc(
        chartCenter,
        chartCenter,
        chartRadius,
        startAngle,
        theAngle + startAngle
      );
      this.ctx.stroke();
      this.ctx.beginPath();
      //

      startAngle += theAngle;
    }

    //hours in the donut
    this.ctx.stroke();
    this.ctx.font = "50px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText (
      String (allHours),
      chartCenter,
      chartCenter - (chartRadius * 0.1));
    //

    //red square in donut
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#FF0000";
    this.ctx.lineJoin = "round";
    this.ctx.lineWidth = chartRadius * 0.15;
    this.ctx.rect(
      chartCenter - (chartRadius * 0.3),
      chartCenter + (chartRadius * 0.1),
      chartRadius * 0.6,
      chartRadius * 0.15);
    this.ctx.stroke();
    //

    //text in red square
    this.ctx.beginPath();
    this.ctx.font = "30px Arial";
    this.ctx.strokeStyle = "white";//7
    this.ctx.textBaseline = "middle";
    this.ctx.textAlign = "center";
    this.ctx.fillText (
      "-0.02",
      chartCenter,
      chartCenter + (chartRadius * 0.17));
    this.ctx.stroke();
    //

    //explanation block
    let xForDescr = chartCenter + chartRadius * 1.7;
    let yForDescr = chartCenter - chartRadius;

    //draw the world "Projects"
    this.ctx.beginPath();
    this.ctx.font = "50px Arial";
    this.ctx.textAlign = "start";
    this.ctx.textBaseline = "middle";
    this.ctx.fillStyle = "black";
    this.ctx.fillText (
      "Проекты",
      xForDescr - chartRadius * 0.08,
      yForDescr);
    this.ctx.stroke();
    //

    for (let i = 0; i < this.projectsData.length; i++) {
      yForDescr += chartRadius * 0.45;

      //draw color pointer of project
      this.ctx.beginPath();
      this.ctx.fillStyle = this.colorsData[i];
      this.ctx.arc(
        xForDescr,
        yForDescr,
        chartRadius * 0.08,
        0,
        2 * Math.PI);
      this.ctx.fill();
      this.ctx.closePath();
      //

      //draw project name
      this.ctx.beginPath();
      this.ctx.font = "30px Arial";
      this.ctx.textAlign = "start";
      this.ctx.textBaseline = "middle";
      this.ctx.fillStyle = "black";
      this.ctx.fillText (
        this.projectsData[i].projectName,
        xForDescr + chartRadius * 0.15,
        yForDescr);
      this.ctx.stroke();
      //
    }
  }
}
