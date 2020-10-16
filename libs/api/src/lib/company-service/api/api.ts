export * from './company.service';
import { CompanyService } from './company.service';
export * from './position.service';
import { PositionService } from './position.service';
export const APIS = [CompanyService, PositionService];
