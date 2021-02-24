import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {
  titleProject: string = 'Меркурий'
  descriptionProject: string = 'Депортамент цифровых решений'

  constructor() { }
  detailsProject: Array<string> = ['Роскосмос','В работе','26 октября 2019', '233 дня','19 человек']
  ngOnInit(): void {
  }
}
