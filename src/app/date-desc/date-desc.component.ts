import { Component, OnInit } from '@angular/core';
import 'moment/locale/ru';



@Component({
  selector: 'do-datedesc',
  templateUrl: './date-desc.component.html',
  styleUrls: ['./date-desc.component.scss']
})
export class DateDescComponent implements OnInit {

  daysOfWeek: any;

  constructor() { }

  ngOnInit(): void {
    this.daysOfWeek = this.getWeek();
  }

  getWeek() {
    const daysOfWeek = [];

    const now = new Date();
    for (let i = -3; i <= 3; i++) {
      const dayOfWeek = new Date();
      dayOfWeek.setDate(now.getDate() + i);
      daysOfWeek.push(dayOfWeek);
    }
    return daysOfWeek.map((dayOfWeek) => {
      return {
        date: dayOfWeek,
        selected: false,
      };
    });
  }
  selectDay(dayOfWeek) {
    this.daysOfWeek.forEach(d => {
      d.selected = false;
    });

    dayOfWeek.selected = true;
  }


}
