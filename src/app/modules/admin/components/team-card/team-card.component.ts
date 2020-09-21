import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent implements OnInit {
  @Input() teamCard;
  teamName: string;
  members: {
    name: string;
    level?: string;
    lead?: boolean;
    profilePic: string;
  }[];
  levels: string;

  constructor() { }

  ngOnInit() {
    this.teamName = this.teamCard.teamName;
    this.members = this.teamCard.members;
    this.countLevels();
  }

  private countLevels(): void {
    const levels = { junior: 0, middle: 0, senior: 0, unknown: 0};
    let levelsStr = '';
    for (const member of this.members) {
      if (member.level === 'junior') {
        levels.junior += 1;
      } else if (member.level === 'middle') {
        levels.middle += 1;
      } else if (member.level === 'senior') {
        levels.senior += 1;
      } else {
        levels.unknown += 1;
      }
    }
    let startDelimiter = false;
    for (const [key, value] of Object.entries(levels)) {
      if (value !== 0) {
        if (startDelimiter) {
          levelsStr += `, ${value} ${key}`;
        } else {
          levelsStr += `${value} ${key}`;
          startDelimiter = true;
        }
      }
    }
    this.levels = levelsStr;
  }

  public addMember() {
    this.members.push({
      name: 'unknown',
      profilePic: ''
    });
    console.log('Member added');
  }
}
