/* tslint:disable */
/* eslint-disable */
export interface RubricData {
	articlesNames: Array<string>;
	children: Array<RubricData>;
	id: string;
	isActive: boolean;
	name: string;
	parentId?: string;
}
