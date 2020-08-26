import { IProject } from './project.model';
import { Time } from '@angular/common'
import { IUser } from '../interfaces/user-response.interface';


export interface IContributor{
    //project: IProject;
    user: IUser;
    totalTime: Time;
}
