export interface TeamMember {
  name: string;
  level?: string;
  lead?: boolean;
  profileImgSrc: string;
}

export interface TeamCard {
  name: string;
  members: TeamMember[];
}

export const teamCards: TeamCard[] = [
  {
    name: 'Teamleads',
    members: [
      {
        name: 'Olya',
        profileImgSrc: '',
      },
      {
        name: 'Slava',
        profileImgSrc: '',
      },
      {
        name: 'Nikita',
        profileImgSrc: '',
      },
    ],
  },
  {
    name: 'Front-End Developers',
    members: [
      {
        name: 'Anna',
        profileImgSrc: '',
        lead: true,
        level: 'junior',
      },
      {
        name: 'Mariya',
        profileImgSrc: '',
        level: 'junior',
      },
      {
        name: 'Vladimir',
        profileImgSrc: '',
        level: 'middle',
      },
      {
        name: 'Anna',
        profileImgSrc: '',
        lead: true,
        level: 'junior',
      },
      {
        name: 'Mariya',
        profileImgSrc: '',
        level: 'junior',
      },
      {
        name: 'Vladimir',
        profileImgSrc: '',
        level: 'middle',
      },{
        name: 'Anna',
        profileImgSrc: '',
        lead: true,
        level: 'junior',
      },
      {
        name: 'Mariya',
        profileImgSrc: '',
        level: 'junior',
      },
      {
        name: 'Vladimir',
        profileImgSrc: '',
        level: 'middle',
      },{
        name: 'Anna',
        profileImgSrc: '',
        lead: true,
        level: 'junior',
      },
      {
        name: 'Mariya',
        profileImgSrc: '',
        level: 'junior',
      },
      {
        name: 'Vladimir',
        profileImgSrc: '',
        level: 'middle',
      },{
        name: 'Anna',
        profileImgSrc: '',
        lead: true,
        level: 'junior',
      },
      {
        name: 'Mariya',
        profileImgSrc: '',
        level: 'junior',
      },
      {
        name: 'Vladimir',
        profileImgSrc: '',
        level: 'middle',
      },{
        name: 'Anna',
        profileImgSrc: '',
        lead: true,
        level: 'junior',
      },
      {
        name: 'Mariya',
        profileImgSrc: '',
        level: 'junior',
      },
      {
        name: 'Vladimir',
        profileImgSrc: '',
        level: 'middle',
      },
      {
        name: 'Vladimir',
        profileImgSrc: '',
        level: 'middle',
      },
      {
        name: 'Vladimir',
        profileImgSrc: '',
        level: 'middle',
      },
    ],
  },
  {
    name: 'Back-End Developers',
    members: [
      {
        name: 'Elena',
        profileImgSrc: '',
        lead: true,
        level: 'middle',
      },
      {
        name: 'Oleg',
        profileImgSrc: '',
        level: 'senior',
      },
    ],
  },
];
