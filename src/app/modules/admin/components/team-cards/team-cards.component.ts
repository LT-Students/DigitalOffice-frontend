import { Component, OnInit } from '@angular/core';

export interface TeamCard {
  teamName: string;
  members: {
    name: string;
    level?: string;
    lead?: boolean;
    profilePic: string;
  }[];
}

@Component({
  selector: 'app-team-cards',
  templateUrl: './team-cards.component.html',
  styleUrls: ['./team-cards.component.scss']
})
export class TeamCardsComponent implements OnInit {
  teamCards: TeamCard[] = [
    {
      teamName: 'Teamleads',
      members: [
        {
          name: 'Olya',
          profilePic: ''
        },
        {
          name: 'Slava',
          profilePic: ''
        },
        {
          name: 'Nikita',
          profilePic: ''
        }
      ]
    },
    {
      teamName: 'Front-End Developers',
      members: [
        {
          name: 'Anna',
          profilePic: '',
          lead: true,
          level: 'junior'
        },
        {
          name: 'Mariya',
          profilePic: '',
          level: 'junior'
        },
        {
          name: 'Vladimir',
          profilePic: '',
          level: 'middle',
        }
      ]
    },
    {
      teamName: 'Back-End Developers',
      members: [
        {
          name: 'Elena',
          profilePic: '',
          lead: true,
          level: 'middle'
        },
        {
          name: 'Oleg',
          profilePic: '',
          level: 'senior'
        }
      ]
    },

  ];

  constructor() { }

  ngOnInit() {
  }

}
