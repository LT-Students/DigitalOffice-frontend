import { Time } from "@angular/common";

export interface ITask {
  time: Time;
  name: string;
  description: string;
  createdAt: Date;
}

