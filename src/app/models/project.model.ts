import { Contributor } from './contributor.model';
import { Company } from './company.model';

export interface Project {
    name: string;
    consumer: Company;
    description: string;
    contributors: Array<Contributor>;
}
