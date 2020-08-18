import { Component, OnInit, Input } from '@angular/core';
import { IProject } from "../../models/project.model";
import { IContributor } from "../../models/contributer.model";
import { IUser } from "../../models/user.model";
import { ICompany } from "../../models/company.model"

@Component({
  selector: 'do-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss']
})
export class MyProjectsComponent implements OnInit {

  constructor() { }

  //data about projectName, consumer, comment, myHours, participants - array with photo of participants

  @Input() project: IProject;
  @Input() contributor: IContributor;
  @Input() user: IUser;
  @Input() company: ICompany;


  amountHiddenPhoto = 0;

  ngOnInit() {
    //determining the number of participants whose photos are not shown
    this.amountHiddenPhoto = this.project.contributors.length - 4;
  }

}
