/* enum Level {
  Junior = 'Junior',
  Middle = 'Middle',
  Senior = 'Senior',
  Empty = '',
}

enum Specialization {
  Frontend = 'Front-End Developer',
  Backend = 'Backend-End Developer',
  Manager = 'Product Manager',
  Designer = 'UI/UX Designer',
  Tester = 'QA Tester',
  Empty = '',
} */
export interface NewMember {
  fullName: string;
  lead?: boolean;
  profileImgSrc: string;
  specialization: string; //Specialization[];
  projectsCount: number;
  level: string; //Level;
}
