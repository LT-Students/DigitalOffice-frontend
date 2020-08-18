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

    const now = new Date();
    for (let i = -3; i <= 3; i++) {
      const day = new Date();
      day.setDate(now.getDate() + i)
      days.push(day);
    }
    return days.map((day) => {
      return {
        date: day,
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
