import {Time} from "@angular/common";

export interface ITask {
  time: Time;
  name: string;
  description: string;
  createdAt: Date;
  icon: any;
}

export interface IProject {
  param1: any;
  param2: any;
}
