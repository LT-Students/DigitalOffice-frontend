export * from './department.service';
import { DepartmentService } from './department.service';
export * from './position.service';
import { PositionService } from './position.service';
export const APIS = [DepartmentService, PositionService];
