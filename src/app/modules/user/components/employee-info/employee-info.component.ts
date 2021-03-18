import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'do-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss'],
})
export class EmployeeInfoComponent implements OnInit {
  public employee = {
    firstName: 'Ангелина',
    lastName: 'Иванова',
    middleName: 'Анатольевна',
    emojiStatus: '🏠',
    aboutMe:
      'С удовольствием отвечу на ваши вопросы, но только в рабочее время! Всем хорошего дня!',
    jobPosition: 'Middle Product Manager',
    department: 'Департамент цифровых технологий',
    location: 'Россия, г. Санкт-Петербург',
    office: 'м.Чернышевская',
    workingRate: 0.75,
    workingHours: {
      startAt: '10:00',
      endAt: '19:00',
    },
    workingSince: 'Октябрь 2017',
    birthDate: '10 октября 1995',
    contacts: {
      email: 'evet.pm@lanit-tercom.com',
      phone: '+7(921)623-25-92',
      telegram: '@eve01beast',
    },
    vacation: 20,
    role: '',
  };

  public listOfIcons = [
    { name: 'question-mark', url: 'assets/svg/question-mark.svg' },
    { name: 'edit', url: 'assets/svg/edit.svg' },
  ];

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.listOfIcons.forEach((icon) => {
      iconRegistry.addSvgIcon(
        icon.name,
        sanitizer.bypassSecurityTrustResourceUrl(icon.url)
      );
    });
  }

  get fullName() {
    const { lastName, firstName, middleName } = this.employee;
    return `${lastName} ${firstName} ${middleName}`;
  }

  get workingHours() {
    const { startAt, endAt } = this.employee.workingHours;
    return `${startAt}-${endAt}`;
  }

  ngOnInit(): void {}
}
