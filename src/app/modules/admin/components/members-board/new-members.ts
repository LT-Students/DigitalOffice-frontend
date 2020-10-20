export interface NewMember {
  users: {
    name: string;
    lead?: boolean;
    profileImgSrc: string;
  }[];
}

export const newMembers: NewMember[] = [
  {
    users: [
      {
        name: 'Алтул Пендлагон',
        profileImgSrc: '',
        lead: true,
      }
    ]
  }
];
