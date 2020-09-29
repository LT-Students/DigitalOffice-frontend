import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'do-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent implements OnInit {
  @Input() teamCard;
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
  }
}
