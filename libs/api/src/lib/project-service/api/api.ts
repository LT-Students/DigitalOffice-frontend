export * from './project.service';
import { ProjectService } from './project.service';
export * from './projectFile.service';
import { ProjectFileService } from './projectFile.service';
export * from './projectWorker.service';
import { ProjectWorkerService } from './projectWorker.service';
export const APIS = [ProjectService, ProjectFileService, ProjectWorkerService];
