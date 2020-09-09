import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onChooseMemberClick() {
    console.log('clicked!');
  }
}
