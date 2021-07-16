export interface Task {
  id: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  minutes: number;
  title: string;
  description: string;
  projectId: string;
  createdAt: Date;
  createdBy: string;
}
