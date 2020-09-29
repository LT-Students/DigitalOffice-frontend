import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'do-team-cards',
  templateUrl: './team-cards.component.html',
  styleUrls: ['./team-cards.component.scss']
})
export class TeamCardsComponent implements OnInit {
  @Input() teamCards;
  constructor() { }
  ngOnInit() {
  }

  public countLevels(members): string {
    const levels = members.reduce((levelsObj, member) => {
      levelsObj[member.level] = (levelsObj[member.level] || 0) + 1;
      return levelsObj;
    }, {});
    return Object.keys(levels).map(level => `${levels[level]} ${level}`).join(', ');
  }

  public addMember(members) {
    members.push({
      name: 'unknown',
      profileImgSrc: ''
    });
    console.log('Member added');
  }
}
