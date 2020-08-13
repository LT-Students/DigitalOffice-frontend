import { IContributor } from './contributer.model';
import { ICompany } from './company.model';

export interface IProject{
    name: string;
    consumer: ICompany;
    description: string;
    contributers: Array<IContributor>;
}