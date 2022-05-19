/* tslint:disable */
/* eslint-disable */
import { ProjectUserInfo } from './project-user-info';
export interface ProjectInfo {
  id: string;
  name: string;
  shortDescription?: string;
  shortName?: string;
  status: string;
  user?: ProjectUserInfo;
}

