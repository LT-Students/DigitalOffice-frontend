enum Level {
  Junior = 'Junior',
  Middle = 'Middle',
  Senior = 'Senior'
}

enum Specialization {
  Frontend = 'Front-End Developer',
  Backend = 'Backend-End Developer',
  Manager = 'Product Manager',
  Designer = 'UI/UX Designer',
  Tester = 'QA Tester'
}
export interface NewMember {
  fullName: string;
  lead?: boolean;
  profileImgSrc: string;
  specialization: Specialization[];
  projectsCount: number;
  level: Level;
}

export const newMembers: NewMember[] = [
  {
    fullName: 'Алексей Пивоваров',
    projectsCount: 2,
    level: Level.Senior,
    profileImgSrc: '',
    specialization: [Specialization.Frontend, Specialization.Backend]
  },
  {
    fullName: 'Алита Пратчетт',
    projectsCount: 2,
    level: Level.Junior,
    profileImgSrc: '',
    specialization: [Specialization.Manager]
  },
  {
    fullName: 'Алтул Пендлагон',
    projectsCount: 2,
    level: Level.Middle,
    profileImgSrc: '',
    specialization: [Specialization.Tester]
  },
  {
    fullName: 'Алиса Реутова',
    projectsCount: 1,
    level: Level.Junior,
    profileImgSrc: '',
    specialization: [Specialization.Designer]
  },
];
