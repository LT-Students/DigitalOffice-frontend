import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'do-datedesc',
  templateUrl: './do-datedesc.component.html',
  styleUrls: ['./do-datedesc.component.scss']
})
export class DoDatedescComponent implements OnInit {

  days = null;

  constructor() { }

  ngOnInit(): void {
    this.days = this.getWeek();
  }

  getWeek() {
    return [
      {day: 'пт', date: '12', selected: false },
      {day: 'сб', date: '13', selected: false },
      {day: 'вс', date: '14', selected: false },
      {day: 'пн', date: '15', selected: false },
      {day: 'вт', date: '16', selected: false },
      {day: 'ср', date: '17', selected: false },
      {day: 'чт', date: '18', selected: false }
    ];
  }
  selectDay(day) {
    console.log(day);

    this.days.forEach(d => {
      d.selected = false;
    });

    day.selected = true;
  }


}
