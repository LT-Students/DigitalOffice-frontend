import { ITask } from './task.interface';
import { Time } from '@angular/common';

export interface IProject {
  id?: number,
  name: string;
  tasks?: ITask[]
}


