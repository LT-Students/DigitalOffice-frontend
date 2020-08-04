import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-gradient-graphics',
  templateUrl: './gradient-graphics.component.html',
  styleUrls: ['./gradient-graphics.component.scss']
})
export class GradientGraphicsComponent implements OnInit {

  constructor() { }
  @Input() dailyHoursData; //data about day, month, hours of time period

  //color for graphic items
  colorsData = ["#7adea2", "#8bdca5", "#9cdaa9", "#add8ad", "#bdd7b1", "#cdd5b4", "#ddd4b8", "#efd2bc"];
  gray = "#EEEEEE";
  //

  //the variable define the data of string above graphic
  timePeriod;
  //

  ngOnInit() {
    //make the line with period data
    let firstPartTimePeriod;
    let secondPartTimePeriod = ""; //use in the case of date consist from two month
    let breakIndex = this.dailyHoursData.length;

    //check if the data includes two month
    if (this.dailyHoursData[0].month != this.dailyHoursData[this.dailyHoursData.length-1].month){
      breakPoint: for (let i = 0; i < this.dailyHoursData.length; i ++){
        if (this.dailyHoursData[0].month != this.dailyHoursData[i].month){
          breakIndex = i;
          secondPartTimePeriod = ", " + this.dailyHoursData[breakIndex].day + " - " + this.dailyHoursData[this.dailyHoursData.length-1].day + " " + this.dailyHoursData[5].month;
          break breakPoint;
        }
      }
    }
    //

    firstPartTimePeriod = this.dailyHoursData[0].day + " - " + this.dailyHoursData[breakIndex-1].day + " " + this.dailyHoursData[0].month;
    this.timePeriod = firstPartTimePeriod + secondPartTimePeriod;
    //
  }
}
