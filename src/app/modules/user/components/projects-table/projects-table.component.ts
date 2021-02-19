import { Component, Input, OnInit } from '@angular/core';

import { Project } from '../../../../models/project.model';

@Component({
  selector: 'do-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./projects-table.component.scss'],
})
export class ProjectsTableComponent implements OnInit {
  constructor() {}

  activeProjects: Project[] = [];
  suspendedProjects: Project[] = [];
  closedProjects: Project[] = [];
  visiblyGroup = '';

  public groups = [
    { groupName: 'В работе', groupData: this.activeProjects },
    { groupName: 'Приостановлены', groupData: this.suspendedProjects },
    { groupName: 'Завершены', groupData: this.closedProjects },
  ];

  ngOnInit() {
    const active1 = {
      name: 'Меркурий – лечу на орбиту',
      consumer: {
        name: 'Роскосмос',
        description: '',
      },
      description:
        'Внедряем ПО на железки Роскосмоса для полета к орбите Меркурия. Человечество надеется на нас!',
      contributors: [
        {
          user: {
            firstName: 'Вася',
            lastName: 'Пчелкин',
            photo: '../../../assets/images/girl.png',
          },
          totalTime: {
            hours: 280,
            minutes: 40,
          },
        },
      ],
    };
    const active2 = {
      name: 'Kojima is a Genius',
      consumer: {
        name: 'Joel K. & Co',
        description: '',
      },
      description:
        'Заказчик хочет, чтобы оно ренедерило ВСЕ! Пробуем реализовать',
      contributors: [
        {
          user: {
            firstName: 'Вася',
            lastName: 'Пчелкин',
            photo: '../../../assets/images/girl.png',
          },
          totalTime: {
            hours: 30,
            minutes: 25,
          },
        },
      ],
    };
    const suspended1 = {
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
            photo: '../../../assets/images/girl.png',
          },
          totalTime: {
            hours: 123,
            minutes: 40,
          },
        },
      ],
      historyDetails: 'Приостановлен 10.06.2019',
    };
    const closed1 = {
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
            photo: '../../../assets/images/girl.png',
          },
          totalTime: {
            hours: 123,
            minutes: 40,
          },
        },
      ],
      historyDetails: 'Завершен 02.03.2020',
    };

    this.activeProjects.push(active1, active2);
    this.suspendedProjects.push(suspended1);
    this.closedProjects.push(closed1);
  }

  onSelect(selectChange) {
    this.visiblyGroup = selectChange.value;
  }
}
