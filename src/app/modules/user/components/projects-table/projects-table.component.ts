import { Component, Input, OnInit } from '@angular/core';

import { DEPRECATED_Project2 } from '../../../../core/models/project.model';

@Component({
  selector: 'do-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./projects-table.component.scss'],
})
export class ProjectsTableComponent implements OnInit {
  constructor() {}

  activeProjects: DEPRECATED_Project2[] = [];
  suspendedProjects: DEPRECATED_Project2[] = [];
  closedProjects: DEPRECATED_Project2[] = [];
  visiblyGroup = '';

  public groups = [
    { groupName: 'В работе', groupData: this.activeProjects },
    { groupName: 'Приостановлены', groupData: this.suspendedProjects },
    { groupName: 'Завершены', groupData: this.closedProjects },
  ];

  ngOnInit() {
    const active = {
      name: 'Меркурий – лечу на орбиту',
      consumer: {
        name: 'Роскосмос',
        description: '',
      },
      description:
        'Внедряем ПО на железки Роскосмоса для полета к орбите Меркурия. Человечество надеется на нас! Внедряем ПО на железки Роскосмоса для полета к орбите Меркурия. Человечество надеется на нас!',
      contributors: [
        {
          user: {
            firstName: 'Вася',
            lastName: 'Пчелкин',
            photo: './assets/images/girl.png',
          },
          totalTime: {
            hours: 280,
            minutes: 40,
          },
        },
        {
          user: {
            firstName: 'Вася',
            lastName: 'Пчелкин',
            photo: './assets/images/girl.png',
          },
          totalTime: {
            hours: 280,
            minutes: 40,
          },
        },
        {
          user: {
            firstName: 'Вася',
            lastName: 'Пчелкин',
            photo: './assets/images/girl.png',
          },
          totalTime: {
            hours: 280,
            minutes: 40,
          },
        },
        {
          user: {
            firstName: 'Вася',
            lastName: 'Пчелкин',
            photo: './assets/images/girl.png',
          },
          totalTime: {
            hours: 280,
            minutes: 40,
          },
        },
        {
          user: {
            firstName: 'Вася',
            lastName: 'Пчелкин',
            photo: './assets/images/girl.png',
          },
          totalTime: {
            hours: 280,
            minutes: 40,
          },
        },
      ],
    };
    const suspended = {
      name: 'Герои Меча и Магии XXV',
      consumer: {
        name: 'Российский Фонд Кино',
        description: '',
      },
      description:
        'Тут были единороги и 50 новых видов драконов, но проект приостановлен до возобновления финансирования',
      contributors: [
        {
          user: {
            firstName: 'Вася',
            lastName: 'Пчелкин',
            photo: './assets/images/girl.png',
          },
          totalTime: {
            hours: 123,
            minutes: 40,
          },
        },
      ],
      historyDetails: 'Приостановлен 10.06.2019',
    };
    const closed = {
      name: 'Ребрендинг “Мир Света”',
      consumer: {
        name: 'ИП Горин Д.А.',
        description: '',
      },
      description:
        'Делаем так, чтобы всем захотелось срочно поменять все светильники в доме!!',
      contributors: [
        {
          user: {
            firstName: 'Вася',
            lastName: 'Пчелкин',
            photo: './assets/images/girl.png',
          },
          totalTime: {
            hours: 123,
            minutes: 40,
          },
        },
      ],
      historyDetails: 'Завершен 02.03.2020',
    };

    this.activeProjects.push(active, active, active, active);
    this.suspendedProjects.push(suspended);
    this.closedProjects.push(closed);
  }

  onSelect(selectChange) {
    this.visiblyGroup = selectChange.value;
  }
}
