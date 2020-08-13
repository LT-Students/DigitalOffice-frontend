import { IProject } from './project.model';
import { IUser } from './user.model';
import { Time } from '@angular/common'

export interface IContributor{
    project: IProject;
    user: IUser;
    totalTime: Time;
}