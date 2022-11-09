/* tslint:disable */
/* eslint-disable */
import { ArticleData } from './article-data';
export interface RubricData {
	articles?: Array<ArticleData>;
	children: Array<RubricData>;
	id: string;
	isActive: boolean;
	name: string;
	parentId?: string;
}
