import { Component, OnInit, Input } from '@angular/core';
import { IProject } from '../../../../models/project.model';
import { Router } from '@angular/router';

@Component({
  selector: 'do-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Input() projects: IProject[] = [];
  private today = Date.now();
  private route: any;

  constructor(private router: Router) {
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

  onOpenNewProject() {
    this.router.navigate(['admin/new-project'], {relativeTo: this.route});

  }

}
