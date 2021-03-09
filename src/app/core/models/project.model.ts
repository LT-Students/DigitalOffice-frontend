import { Contributor } from './contributor.model';
import { Company } from './company.model';

export interface DEPRECATED_Project2 {
  name: string;
  consumer: Company;
  description: string;
  contributors: Array<Contributor>;
  historyDetails?: string;
}
