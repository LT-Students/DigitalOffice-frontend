import {ITask} from "./task.model";

export interface IProject {
  name: string;
  tasks: Array<ITask>
}
