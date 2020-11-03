import { ITask } from './task.interface';

export interface IProject {
  id?: number;
  name: string;
  tasks?: ITask[];
}




