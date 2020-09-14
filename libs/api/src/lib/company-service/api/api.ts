export * from './company.service';
import { CompanyService } from './company.service';
export * from './department.service';
import { DepartmentService } from './department.service';
export * from './position.service';
import { PositionService } from './position.service';
export * from './userPosition.service';
import { UserPositionService } from './userPosition.service';
export const APIS = [CompanyService, DepartmentService, PositionService, UserPositionService];
