import { ITask } from './task.interface';

export interface IProject {
  name: string;
  tasks: ITask[]
}
