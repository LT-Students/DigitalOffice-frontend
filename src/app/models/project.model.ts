import { Contributor } from './contributor.model';
import { ICompany } from './company.model';

export interface IProject{
    name: string;
    consumer: ICompany;
    description: string;
    contributors: Array<Contributor>;
}
