import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'do-add-hours-choice',
  templateUrl: './add-hours-choice.component.html',
  styleUrls: ['./add-hours-choice.component.scss'],
})
export class AddHoursChoiceComponent implements OnInit {
  options = [
    'Проект',
    'Командировка',
    'Обучение',
    'Больничный',
    'Отпуск',
    'Отгул',
  ];

  constructor() {}

  ngOnInit(): void {}
}
