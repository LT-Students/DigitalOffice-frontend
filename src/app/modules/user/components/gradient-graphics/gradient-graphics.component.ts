import { Component, Input, OnInit } from '@angular/core';

import { ITimePeriod } from '../../../../interfaces/time-period.interface';

export interface IDailyHoursData {
  day: string;
  month: string;
  hours: number;
  minutes: number;
}

@Component({
  selector: 'app-gradient-graphics',
  templateUrl: './gradient-graphics.component.html',
  styleUrls: [ './gradient-graphics.component.scss' ]
})
export class GradientGraphicsComponent implements OnInit {
  @Input()
  public timePeriodSelected: ITimePeriod;
  @Input()
  public dailyHoursData; // data about day, month, hours, minutes of time period

  constructor() { }


  // color for graphic items
  colorsData = [ '#7adea2', '#8bdca5', '#9cdaa9', '#add8ad', '#bdd7b1', '#cdd5b4', '#ddd4b8', '#efd2bc' ];
  gray = '#EEEEEE';


  // define amount of graphic columns/strings
  amountOfWorkHours = [ ...Array(8).keys() ];
  amountOfDays = [ ...Array(6).keys() ];

  // determination of days when was processing
  processingArray = [];
  //

  // the variable define the data of string above graphic
  timePeriod;

  ngOnInit() {
    // make the line with period data
    let firstPartTimePeriod;
    let secondPartTimePeriod = ''; // use in the case of date consist from two month
    let breakIndex = this.dailyHoursData.length;

    // check if the data includes two month
    if ( this.dailyHoursData[0].month !== this.dailyHoursData[this.dailyHoursData.length - 1].month ) {
      breakPoint: for ( let i = 0; i < this.dailyHoursData.length; i++ ) {
        if ( this.dailyHoursData[0].month !== this.dailyHoursData[i].month ) {
          breakIndex = i;
          secondPartTimePeriod = ', ' + this.dailyHoursData[breakIndex].day + ' - ' + this.dailyHoursData[this.dailyHoursData.length - 1].day + ' ' + this.dailyHoursData[5].month;
          break breakPoint;
        }
      }
    }
    //

    // create string of time period
    firstPartTimePeriod = this.dailyHoursData[0].day + ' - ' + this.dailyHoursData[breakIndex - 1].day + ' ' + this.dailyHoursData[0].month;
    this.timePeriod = firstPartTimePeriod + secondPartTimePeriod;


    // to check processing in hours
    for ( let i = 0; i < this.dailyHoursData.length; i++ ) {
      this.processingArray[i] = this.dailyHoursData[i].hours > 8 || this.dailyHoursData[i].hours === 8 && this.dailyHoursData[i].minutes > 0;
    }
    //
  }
}
