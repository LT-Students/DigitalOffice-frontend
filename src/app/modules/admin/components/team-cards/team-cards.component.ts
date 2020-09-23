import { Component, OnInit } from '@angular/core';

export interface TeamCard {
  name: string;
  members: {
    name: string;
    level?: string;
    lead?: boolean;
    profileImgSrc: string;
  }[];
}

@Component({
  selector: 'do-team-cards',
  templateUrl: './team-cards.component.html',
  styleUrls: ['./team-cards.component.scss']
})
export class TeamCardsComponent implements OnInit {
  teamCards: TeamCard[] = [
    {
      name: 'Teamleads',
      members: [
        {
          name: 'Olya',
          profileImgSrc: ''
        },
        {
          name: 'Slava',
          profileImgSrc: ''
        },
        {
          name: 'Nikita',
          profileImgSrc: ''
        }
      ]
    },
    {
      name: 'Front-End Developers',
      members: [
        {
          name: 'Anna',
          profileImgSrc: '',
          lead: true,
          level: 'junior'
        },
        {
          name: 'Mariya',
          profileImgSrc: '',
          level: 'junior'
        },
        {
          name: 'Vladimir',
          profileImgSrc: '',
          level: 'middle',
        }
      ]
    },
    {
      name: 'Back-End Developers',
      members: [
        {
          name: 'Elena',
          profileImgSrc: '',
          lead: true,
          level: 'middle'
        },
        {
          name: 'Oleg',
          profileImgSrc: '',
          level: 'senior'
        }
      ]
    },

  ];
  constructor() { }

  ngOnInit() {
  }

  private countLevels(members): string {
    const levels = members.reduce((levelsObj, member) => {
      levelsObj[member.level] = (levelsObj[member.level] || 0) + 1;
      return levelsObj;
    }, {});

    let startDelimiter = false;
    let levelsStr = '';

    for (const [key, value] of Object.entries(levels)) {
      if (startDelimiter) {
        levelsStr += `, ${value} ${key}`;
      } else {
        levelsStr += `${value} ${key}`;
        startDelimiter = true;
      }
    }
    return levelsStr;
  }

  public addMember(members) {
    members.push({
      name: 'unknown',
      profileImgSrc: ''
    });
    console.log('Member added');
  }
}
