import {Time} from "@angular/common";

export interface ITask {
  /*time: Time;*/
  time: Date;
  name: string;
  description: string;
  createdAt: Date;
}

