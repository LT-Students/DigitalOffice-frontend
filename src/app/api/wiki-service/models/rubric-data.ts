/* tslint:disable */
/* eslint-disable */
export interface RubricData {
	articlesNames?: Array<{ id: string; name: string; isActive: boolean }>;
	children?: Array<RubricData>;
	id: string;
	isActive: boolean;
	name: string;
	parentId?: string;
}
