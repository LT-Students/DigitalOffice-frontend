import { Component, Input } from '@angular/core';

import { TeamCard } from '../new-project/team-cards';

@Component({
  selector: 'do-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss'],
})
export class TeamCardComponent {
  @Input()
  public teamCard: TeamCard;

  constructor() {}

  public countLevels(members): string {
    const levels = members.reduce((levelsObj, member) => {
      levelsObj[member.level] = (levelsObj[member.level] || 0) + 1;
      return levelsObj;
    }, {});
    return Object.keys(levels)
      .map((level) => `${levels[level]} ${level}`)
      .join(', ');
  }

  public addMember(members): void {
    members.push({
      name: 'unknown',
      profileImgSrc: '',
    });
  }
}
