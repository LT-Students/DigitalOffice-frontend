import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { DEPRECATED_Project2 } from '../../../../core/models/project.model';
import { NewCompanyComponent } from '../new-company/new-company.component';
import { NewDepartmentComponent } from '../new-department/new-department.component';

@Component({
  selector: 'do-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  projects: DEPRECATED_Project2[] = [];
  public today = Date.now();

  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
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

    this.projects.push(active, active, active, active);
  }

  onOpenNewProject() {
    this.router.navigate(['admin/new-project']);
  }

  onOpenNewCompany(): void {
    const dialogRef = this.dialog.open(NewCompanyComponent, {
      width: '503px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  onOpenNewDepartment(): void {
    const dialogRef = this.dialog.open(NewDepartmentComponent, {
      width: '503px',
    });
    /*dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });*/
  }
}
