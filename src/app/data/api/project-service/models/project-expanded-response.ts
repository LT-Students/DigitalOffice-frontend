/* tslint:disable */
/* eslint-disable */
import { Department } from './department';
import { Project } from './project';
import { ProjectFile } from './project-file';
import { ProjectUser } from './project-user';
export interface ProjectExpandedResponse {
  department?: Department;
  project?: Project;
  projectFile?: Array<ProjectFile>;
  users?: Array<ProjectUser>;
}
