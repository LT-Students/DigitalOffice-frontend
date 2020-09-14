import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { NewCompanyComponent } from "../new-company/new-company.component";
import { Project } from '../../../../models/project.model';

@Component({
  selector: 'do-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {

  @Input() projects: Project[] = [];
  private today = Date.now();

  constructor(public dialog: MatDialog) { }

  OnOpenNewCompany():void {
    let dialogRef = this.dialog.open(NewCompanyComponent, {
      width: '503px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    const proj1 = {
      name: 'MainProject1',
      consumer: {
        name: 'Company№1',
        description: 'Super company that is doing nothing.'
      },
      description: 'Just project. Nothing special.',
      contributors: [
        {
          user: {
            firstName: 'Вася',
            lastName: 'Пчелкин',
            photo: '../../../assets/images/girl.png'
          },
          totalTime: {
            hours: 40,
            minutes: 0
          }
        }
      ]
    };
    const proj2 = {
      name: 'MainProject2',
      consumer: {
        name: 'Company№2',
        description: 'Super company that is doing nothing.'
      },
      description: 'Just project. Nothing special.',
      contributors: [
        {
          user: {
            firstName: 'Вася',
            lastName: 'Пчелкин',
            photo: '../../../assets/images/girl.png'
          },
          totalTime: {
            hours: 40,
            minutes: 0
          }
        }
      ]
    };

    this.projects.push(
      proj1,
      proj2
    );
  }

}
