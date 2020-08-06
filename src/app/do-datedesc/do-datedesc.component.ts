import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'do-datedesc',
  templateUrl: './do-datedesc.component.html',
  styleUrls: ['./do-datedesc.component.scss']
})
export class DoDatedescComponent implements OnInit {

  days: any;

  constructor() { }

  ngOnInit(): void {
    this.days = this.getWeek();
  }

  getWeek() {
    const days = [];

    for (let i = -3; i <= 3; i++) {
      const now = new Date();
      days.push(new Date(now.setDate(now.getDate() + i)));
    }

    const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

    return days.map((day) => {
      const date = day.getDate();
      return {
        day: weekDays[day.getDay()],
        date: (date > 0) ? date : `0${date}`,
        selected: false,
      };
    });
  }
  selectDay(day) {
    this.days.forEach(d => {
      d.selected = false;
    });

    day.selected = true;
  }


}
