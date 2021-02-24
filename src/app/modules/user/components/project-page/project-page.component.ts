import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})

export class ProjectPageComponent implements OnInit {
  titleProject: string = 'Меркурий'
  descriptionProject: string = 'Депортамент цифровых решений'
  detailsProject: Array<string> = ['Роскосмос', 'В работе', '26 октября 2019', '233 дня', '19 человек']
  smallPhotos: Array<string> = [
    '../../../../../assets/images/smallPhoto/Ellipse90.png', 
    '../../../../../assets/images/smallPhoto/Ellipse91.png', 
    '../../../../../assets/images/smallPhoto/Ellipse92.png', 
    '../../../../../assets/images/smallPhoto/Ellipse93.png', 
    '../../../../../assets/images/smallPhoto/Ellipse94.png', 
    '../../../../../assets/images/smallPhoto/Ellipse95.png', 
    '../../../../../assets/images/smallPhoto/Ellipse96.png'
  ]

  constructor() { }
  ngOnInit(): void {
  }
}
